import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { Response } from 'express';

import { SlotService } from './slot.service';
import { CreateSlotRequest, Slot } from './slot.model';
import * as dayjs from 'dayjs';

@Controller('slot')
export class SlotController {
  constructor(private service: SlotService) {}

  @Get()
  async findAll(): Promise<Slot[]> {
    return this.service.findAll({
      relations: {
        appointment: true,
      },
    });
  }

  @Post()
  async create(@Body() slot: CreateSlotRequest, @Res() res: Response) {
    try {
      const startTime = dayjs(slot.startTime);
      const endTime = dayjs(slot.endTime);
      const earliestTime = dayjs().hour(9);
      const latestTime = dayjs().hour(18);

      if (startTime.isAfter(endTime)) {
        throw new Error('End time must be greater than start time');
      }

      if (endTime.diff(startTime, 'minutes') > 30) {
        throw new Error('Duration must not be longer than 30 minutes');
      }

      if (
        startTime.isBefore(earliestTime) ||
        endTime.isAfter(latestTime) ||
        [0, 6].includes(startTime.day()) ||
        [0, 6].includes(endTime.day())
      ) {
        throw new Error(
          'Appointment times are between 9AM and 6PM on weekdays',
        );
      }

      const existingAppointment = await this.service.findOneBy({
        date: dayjs(slot.date),
        startTime: MoreThanOrEqual(startTime.toDate()),
        endTime: LessThanOrEqual(endTime.toDate()),
      });

      if (existingAppointment) {
        throw new Error('Slot has already been booked');
      }

      const createdSlot = await this.service.create(slot);
      res.status(HttpStatus.CREATED).json(createdSlot);
    } catch (e) {
      console.error(e);
      res.status(HttpStatus.BAD_REQUEST).send(e.message);
    }
  }
}

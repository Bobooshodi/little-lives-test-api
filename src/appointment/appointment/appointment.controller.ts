import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AppointmentService } from './appointment.service';
import { Appointment, CreateAppointmentRequest } from './appointment.model';
import { SlotService } from "../../slot/slot/slot.service";

@Controller('appointment')
export class AppointmentController {
  constructor(private service: AppointmentService, private slotService: SlotService) {}

  @Get()
  async findAll(): Promise<Appointment[]> {
    return this.service.findAll();
  }

  @Post()
  async create(
    @Body() appointment: CreateAppointmentRequest,
  ): Promise<Appointment> {
    try {
      const slot = await this.slotService.findOne(appointment.slot, true);

      if (!slot) {
        throw new HttpException('Invalid Slot', HttpStatus.BAD_REQUEST);
      }

      appointment.slot = slot.id;

      return this.service.create(appointment);
    } catch (e) {
      console.error(e);
    }
  }
}

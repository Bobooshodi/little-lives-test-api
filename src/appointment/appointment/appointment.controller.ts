import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.model';

@Controller('appointment')
export class AppointmentController {
  constructor(private service: AppointmentService) {}

  @Get()
  async findAll(): Promise<Appointment[]> {
    return this.service.findAll();
  }

  @Post()
  async create(@Body() appointment: Appointment): Promise<Appointment> {

  }
}

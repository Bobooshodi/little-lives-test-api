import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';

import { AppointmentEntity } from './appointment.entity';
import { Appointment } from './appointment.model';
import { BaseService } from '../../commons/base.service';

@Injectable()
export class AppointmentService extends BaseService<
  AppointmentEntity,
  Appointment
> {
  constructor(
    @InjectMapper() mapper: Mapper,
    @InjectRepository(AppointmentEntity)
    protected repository: Repository<AppointmentEntity>,
  ) {
    super(mapper);
    this.entity = AppointmentEntity;
    this.model = Appointment;
  }
}

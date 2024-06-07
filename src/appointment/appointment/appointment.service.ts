import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import type { Mapper, MappingProfile } from '@automapper/core';

import { AppointmentEntity } from './appointment.entity';
import { createMap } from '@automapper/core';
import { Appointment } from './appointment.model';
import { SlotEntity } from '../../slot/slot/slot.entity';
import { Slot } from '../../slot/slot/slot.model';
import { BaseService } from '../../commons/base.service';

@Injectable()
export class AppointmentService extends BaseService<
  AppointmentEntity,
  Appointment
> {
  constructor(
    @InjectMapper() mapper: Mapper,
    @InjectRepository(AppointmentEntity)
    repository: Repository<AppointmentEntity>,
  ) {
    super(mapper);
    this.repository = repository;
  }

  entity = AppointmentEntity;
  model = Appointment;

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, AppointmentEntity, Appointment);
      createMap(mapper, SlotEntity, Slot);
    };
  }
}

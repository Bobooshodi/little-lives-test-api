import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  extend,
  forMember,
  mapFrom,
  Mapper,
  MappingConfiguration,
  MappingProfile,
} from '@automapper/core';
import * as dayjs from "dayjs";

import { AppointmentEntity } from '../appointment/appointment/appointment.entity';
import { Appointment } from '../appointment/appointment/appointment.model';
import { SlotEntity } from '../slot/slot/slot.entity';
import { Slot } from '../slot/slot/slot.model';
import { BaseEntity } from './base.entity';
import { BaseModel } from './base.model';

export abstract class BaseService<Entity, Model> extends AutomapperProfile {
  protected constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
    createMap(
      mapper,
      BaseEntity,
      BaseModel,
      forMember(
        (destination) => destination.id,
        mapFrom((source) => source.uuid),
      ),
    );
  }

  protected repository;
  protected entity;
  protected model;

  async create(data): Promise<Model> {
    const record = await this.repository.create(data);
    await this.repository.save(record);
    return this.mapper.map(record, this.entity, this.model);
  }

  async findAll(options = {}): Promise<Model[]> {
    const records: Entity[] = await this.repository.find(options);

    return this.mapper.mapArray(records, this.entity, this.model);
  }

  async findOne(
    uuid: string,
    returnOriginalDocument = false,
  ): Promise<Model | Entity | null> {
    const record: Entity = await this.repository.findOneBy({ uuid });
    return returnOriginalDocument
      ? record
      : this.mapper.map(record, this.entity, this.model);
  }

  async findOneBy(
    query: any,
    returnOriginalDocument = false,
  ): Promise<Model | Entity | null> {
    const record: Entity = await this.repository.findOneBy(query);
    return returnOriginalDocument
      ? record
      : this.mapper.map(record, this.entity, this.model);
  }

  async findBy(query: any, options = {}): Promise<Model[]> {
    const records: Entity[] = await this.repository.find({
      where: query,
      ...options,
    });
    return this.mapper.mapArray(records, this.entity, this.model);
  }

  async remove(id: number): Promise<any> {
    await this.repository.delete(id);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, AppointmentEntity, Appointment);
      createMap(
        mapper,
        SlotEntity,
        Slot,
        forMember(
          (destination) => destination.availableSlots,
          mapFrom((source) => (source.appointment ? 1 : 0)),
        ),
        forMember(
          (destination) => destination.startTime,
          mapFrom((source) => dayjs(source.startTime).format('h:mm A')),
        ),
        forMember(
          (destination) => destination.endTime,
          mapFrom((source) => dayjs(source.endTime).format('h:mm A')),
        ),
        forMember(
          (destination) => destination.date,
          mapFrom((source) => dayjs(source.date).format('YYYY-MM-DD')),
        ),
      );
    };
  }

  protected get mappingConfigurations(): MappingConfiguration[] {
    // the 3 createMap() above will get this `extend()`
    return [extend(BaseEntity, BaseModel)];
  }
}

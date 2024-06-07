import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SlotEntity } from './slot.entity';
import { BaseService } from '../../commons/base.service';
import { Slot } from './slot.model';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class SlotService extends BaseService<SlotEntity, Slot> {
  constructor(
    @InjectMapper() mapper: Mapper,
    @InjectRepository(SlotEntity)
    protected repository: Repository<SlotEntity>,
  ) {
    super(mapper);
  }

  entity = SlotEntity;
  model = Slot;

  async findAll(options = {}): Promise<Slot[]> {
    const records: SlotEntity[] = await this.repository.find(options);

    return this.mapper.mapArray(records, this.entity, this.model);
  }
}

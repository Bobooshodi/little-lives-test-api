import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SlotEntity } from './slot.entity';

@Injectable()
export class SlotService {
  constructor(
    @InjectRepository(SlotEntity)
    private repository: Repository<SlotEntity>,
  ) {}

  findAll(): Promise<SlotEntity[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<SlotEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

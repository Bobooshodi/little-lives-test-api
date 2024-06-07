import { BaseModel } from '../../commons/base.model';
import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class Slot extends BaseModel {
  @AutoMap()
  @IsNotEmpty()
  startTime: string;

  @AutoMap()
  @IsNotEmpty()
  endTime: string;

  @AutoMap()
  @IsNotEmpty()
  date: string;

  @AutoMap()
  availableSlots: number;
}

export class CreateSlotRequest extends PartialType(Slot) {}

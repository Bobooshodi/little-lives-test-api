import { IsDate, IsEmail, IsNotEmpty } from "class-validator";
import { AutoMap } from '@automapper/classes';
import { OmitType } from '@nestjs/mapped-types';

import { Slot } from '../../slot/slot/slot.model';

export class Appointment {
  @AutoMap()
  @IsNotEmpty()
  date: Date;

  @AutoMap()
  @IsNotEmpty()
  fullName: string;

  @AutoMap()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @AutoMap()
  remarks: string;

  @AutoMap(() => Slot)
  @IsNotEmpty()
  slot: Slot;
}

export class CreateAppointmentRequest extends OmitType(Appointment, ['slot']) {
  @IsNotEmpty()
  slot: any;
}

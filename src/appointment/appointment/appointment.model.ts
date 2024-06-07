import { IsNotEmpty } from 'class-validator';

import { Slot } from '../../slot/slot/slot.model';

export class Appointment {
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  id: string;

  slots: Slot[];
}

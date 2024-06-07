import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SlotEntity } from '../../slot/slot/slot.entity';
import { BaseEntity } from '../../commons/base.entity';

@Entity()
export class AppointmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  uuid: string;

  @OneToMany(() => SlotEntity, (slot) => slot.appointment)
  slots: boolean;
}

import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { SlotEntity } from '../../slot/slot/slot.entity';
import { BaseEntity } from '../../commons/base.entity';

@Entity('appointments')
export class AppointmentEntity extends BaseEntity {
  @AutoMap()
  @Column({ type: 'date' })
  date: Date;

  @AutoMap()
  @Column()
  fullName: string;

  @AutoMap()
  @Column()
  email: string;

  @AutoMap()
  @Column({ nullable: true })
  remarks: string;

  @AutoMap(() => SlotEntity)
  @OneToOne(() => SlotEntity, (slot) => slot.appointment)
  @JoinColumn()
  slot: boolean;
}

import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from '../../commons/base.entity';
import { AutoMap } from '@automapper/classes';
import { AppointmentEntity } from '../../appointment/appointment/appointment.entity';

@Entity('slots')
export class SlotEntity extends BaseEntity {
  @AutoMap()
  @Column({ type: 'timestamptz' })
  startTime: Date;

  @AutoMap()
  @Column({ type: 'timestamptz' })
  endTime: Date;

  @AutoMap()
  @Column({ type: 'date' })
  date: Date;

  @AutoMap(() => AppointmentEntity)
  @OneToOne(() => AppointmentEntity, (appointment) => appointment.slot)
  appointment: boolean;
}

import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppointmentEntity } from '../../appointment/appointment/appointment.entity';
import { BaseEntity } from '../../commons/base.entity';

@Entity()
export class SlotEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time' })
  startTime: Date;

  @Column({ type: 'time' })
  endTime: Date;

  @ManyToOne(() => AppointmentEntity, (app) => app.slots)
  appointment: AppointmentEntity;
}

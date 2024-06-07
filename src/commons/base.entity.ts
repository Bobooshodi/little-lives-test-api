import {
  CreateDateColumn,
  Column,
  DeleteDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';

export class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  @Generated('uuid')
  uuid: string;

  @AutoMap()
  @CreateDateColumn()
  createdDate: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedDate: Date;

  @AutoMap()
  @DeleteDateColumn()
  deletedDate: Date;
}

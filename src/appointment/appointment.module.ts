import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment/appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './appointment/appointment.entity';
import { AppointmentService } from './appointment/appointment.service';
import { SlotService } from "../slot/slot/slot.service";
import { SlotEntity } from "../slot/slot/slot.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity, SlotEntity])],
  controllers: [AppointmentController],
  providers: [AppointmentService, SlotService],
})
export class AppointmentModule {}

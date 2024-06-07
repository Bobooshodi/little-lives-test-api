import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment/appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './appointment/appointment.entity';
import { AppointmentService } from './appointment/appointment.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './appointment/appointment.module';
import { AppointmentEntity } from './appointment/appointment/appointment.entity';
import { SlotEntity } from './slot/slot/slot.entity';
import { SlotModule } from './slot/slot.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [AppointmentEntity, SlotEntity],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AppointmentModule,
    SlotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

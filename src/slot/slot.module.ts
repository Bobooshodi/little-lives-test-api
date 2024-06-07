import { Module } from '@nestjs/common';
import { SlotService } from './slot/slot.service';
import { SlotController } from './slot/slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotEntity } from './slot/slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SlotEntity])],
  providers: [SlotService],
  controllers: [SlotController],
})
export class SlotModule {}

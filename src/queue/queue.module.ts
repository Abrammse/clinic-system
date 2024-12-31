import { Module } from '@nestjs/common';
import { QueueService } from './service/queue.service';
import { QueueController } from './controllers/queue.controller';
import { QueueGateway } from './Gateway/queue.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patients } from 'src/patient/models/patient.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Patients]), ScheduleModule.forRoot()],
  providers: [QueueService, QueueGateway],
  controllers: [QueueController],
})
export class QueueModule {}

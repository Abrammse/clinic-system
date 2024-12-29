import { Module } from '@nestjs/common';
import { PatientService } from './service/patient.service';
import { PatientController } from './controllers/patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patients } from './models/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patients])],
  providers: [PatientService],
  controllers: [PatientController],
})
export class PatientModule {}

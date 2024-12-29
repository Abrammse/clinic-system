import { Module } from '@nestjs/common';
import { ClinicService } from './service/clinic.service';
import { ClinicController } from './controllers/clinic.controller';

@Module({
  providers: [ClinicService],
  controllers: [ClinicController],
})
export class ClinicModule {}

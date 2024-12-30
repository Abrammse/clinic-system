import { Module } from '@nestjs/common';
import { ClinicService } from './service/clinic.service';
import { ClinicController } from './controllers/clinic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinicsentity } from './models/clinic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clinicsentity])],
  providers: [ClinicService],
  controllers: [ClinicController],
})
export class ClinicModule {}

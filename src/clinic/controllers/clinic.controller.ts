import { Body, Controller, Post } from '@nestjs/common';
import { ClinicService } from '../service/clinic.service';
import { Clinicpost } from '../models/clinic.interface';
import { Observable } from 'rxjs';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly patientService: ClinicService) {}

  @Post()
  create(@Body() feedpost: Clinicpost): Observable<Clinicpost> {
    return this.patientService.create(feedpost);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClinicService } from '../service/clinic.service';
import { Clinicpost } from '../models/clinic.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly patientService: ClinicService) {}

  @Post()
  create(@Body() feedpost: Clinicpost): Observable<Clinicpost> {
    return this.patientService.create(feedpost);
  }

  @Get()
  findAll(): Observable<Clinicpost[]> {
    return this.patientService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() feedpost: Clinicpost,
  ): Observable<UpdateResult> {
    return this.patientService.update(id, feedpost);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.patientService.delete(+id);
  }
}

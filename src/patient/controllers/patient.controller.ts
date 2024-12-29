import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PatientService } from '../service/patient.service';
import { Observable } from 'rxjs';
import { patientpost } from '../models/patient..interface';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() feedpost: patientpost): Observable<patientpost> {
    return this.patientService.create(feedpost);
  }

  @Get()
  findAll(): Observable<patientpost[]> {
    return this.patientService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() feedpost: patientpost,
  ): Observable<UpdateResult> {
    return this.patientService.update(id, feedpost);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.patientService.delete(+id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinicsentity } from '../models/clinic.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { Clinicpost } from '../models/clinic.interface';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinicsentity)
    private readonly clinicRepository: Repository<Clinicsentity>,
  ) {}

  create(Patientpost: Clinicpost): Observable<Clinicpost> {
    return from(this.clinicRepository.save(Patientpost));
  }
}

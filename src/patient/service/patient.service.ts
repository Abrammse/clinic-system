import { Injectable } from '@nestjs/common';
import { Patients } from '../models/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { patientpost } from '../models/patient..interface';
import { from, Observable } from 'rxjs';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patients)
    private readonly patientRepository: Repository<Patients>,
  ) {}

  create(Patientpost: patientpost): Observable<patientpost> {
    return from(this.patientRepository.save(Patientpost));
  }

  findAll(): Observable<patientpost[]> {
    return from(this.patientRepository.find());
  }

  update(id: number, Patientpost: patientpost): Observable<UpdateResult> {
    return from(this.patientRepository.update(id, Patientpost));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.patientRepository.delete(id));
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinicsentity } from '../models/clinic.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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

  findAll(): Observable<Clinicpost[]> {
    return from(this.clinicRepository.find());
  }

  update(id: number, Patienftpost: Clinicpost): Observable<UpdateResult> {
    return from(this.clinicRepository.update(id, Patienftpost));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.clinicRepository.delete(id));
  }
}

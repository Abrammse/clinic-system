import { Injectable } from '@nestjs/common';
import { Patients } from '../models/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { patientpost } from '../models/patient..interface';
import { from, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patients)
    private readonly patientRepository: Repository<Patients>,
  ) {}

  create(Patienftpost: patientpost): Observable<patientpost> {
    const patient = this.patientRepository.create(Patienftpost);
    
    // توليد رقم الملف باستخدام UUID ورقم الدور بناءً على آخر مريض في العيادة
    patient.fileNumber = uuidv4();  // توليد UUID
    if (patient.clinicId) {
      return from(
        this.patientRepository
          .findOne({
            where: { clinicId: patient.clinicId },
            order: { queueNumber: 'DESC' }, // ترتيب المرضى بناءً على رقم الدور
          })
          .then((lastPatient) => {
            patient.queueNumber = lastPatient ? lastPatient.queueNumber + 1 : 1;
            return this.patientRepository.save(patient);
          }),
      );
    } else {
      return from(this.patientRepository.save(patient));
    }
  }
  findAll(): Observable<patientpost[]> {
    return from(this.patientRepository.find());
  }

  update(id: number, Patienftpost: patientpost): Observable<UpdateResult> {
    return from(this.patientRepository.update(id, Patienftpost));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.patientRepository.delete(id));
  }
}

import { Clinicpost } from 'src/clinic/models/clinic.interface';

export interface patientpost {
  id?: number;
  fileNumber?: string;
  name?: string;
  phone?: string;
  clinicId?: number;
  queueNumber?: number;
  checkInTime?: Date;
  author?: Clinicpost;
}

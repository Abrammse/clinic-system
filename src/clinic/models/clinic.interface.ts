import { patientpost } from 'src/patient/models/patient..interface';

export class Clinicpost {
  id?: number;

  name?: string;

  currentQueueNumber?: number;
  posts?: patientpost[];
}

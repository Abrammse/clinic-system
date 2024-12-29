import { patientpost } from 'src/patient/models/patient..interface';
export class Clinic {
  id?: number;

  name?: string;

  currentQueueNumber?: number;

  patients?: patientpost[];
}

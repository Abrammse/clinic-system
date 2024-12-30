import { Patients } from 'src/patient/models/patient.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('clinic')
export class Clinicsentity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  currentQueueNumber: number;

  @OneToMany(() => Patients, (patients) => patients.clinic)
  author: Patients[];
}

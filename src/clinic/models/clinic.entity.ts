import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Clinicsentity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  currentQueueNumber: number;
}

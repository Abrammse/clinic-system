import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('patient')
export class Patients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  fileNumber: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  clinicId: number;

  @Column({ default: 0 })
  queueNumber: number;

  @CreateDateColumn()
  checkInTime: Date;
}

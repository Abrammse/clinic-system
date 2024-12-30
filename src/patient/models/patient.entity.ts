import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { Clinicsentity } from 'src/clinic/models/clinic.entity';
import { v4 as uuidv4 } from 'uuid';

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

  // العلاقة بين المريض والعيادة
  @ManyToOne(() => Clinicsentity, (clinic) => clinic.author)
  @JoinColumn({ name: 'clinicId' })
  clinic: Clinicsentity;

  // توليد رقم الملف و رقم الدور قبل الإدخال في قاعدة البيانات
  @BeforeInsert()
  async generateFileNumberAndQueueNumber() {
    // توليد رقم الملف باستخدام UUID
    this.fileNumber = uuidv4();

    // توليد رقم الدور بناءً على آخر مريض في العيادة
    if (this.clinic) {
      const lastPatient = await this.clinic.author.sort(
        (a, b) => b.queueNumber - a.queueNumber,
      )[0];

      this.queueNumber = lastPatient ? lastPatient.queueNumber + 1 : 1;
    }
  }
}

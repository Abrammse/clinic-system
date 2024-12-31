import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Patients } from 'src/patient/models/patient.entity';
import { Repository } from 'typeorm';
import { Server } from 'socket.io';

@Injectable()
export class QueueService {
  private server: Server; // لإرسال التحديثات للعميل

  constructor(
    @InjectRepository(Patients)
    private patientRepository: Repository<Patients>,
  ) {}
  // إعداد socket.io
  setServer(server: Server) {
    this.server = server;
  }

  getWaitingListUpdates(): Observable<any> {
    return from(this.patientRepository.find());
  }

  async assignRoleNumbers() {
    try {
      const patients = await this.patientRepository.find();
      for (let index = 0; index < patients.length; index++) {
        patients[index].queueNumber = index + 1;
        await this.patientRepository.save(patients[index]);
      }
      return { message: 'تم تعيين الأرقام بنجاح' };
    } catch (error) {
      console.error('Error assigning role numbers:', error);
      throw new Error('حدث خطأ أثناء تعيين الأرقام');
    }
  }
  async resetRoleNumbers() {
    console.log("Attempting to reset role numbers...");
    if (this.server) {
      try {
        console.log("Updating queue numbers to 0...");
        await this.patientRepository.update({}, { queueNumber: 0 });
        console.log("Queue numbers reset successfully.");
  
        // إرسال التحديث عبر Socket.IO
        this.server.emit('update-waiting-list', []);
        console.log("Waiting list updated successfully.");
  
        return { message: 'تم إعادة تعيين الأرقام بنجاح' };
      } catch (error) {
        console.error('Error resetting role numbers:', error);
        throw new Error('حدث خطأ أثناء إعادة تعيين الأرقام');
      }
    } else {
      console.error('Error: Server is not set!');
      throw new Error('الخادم غير موجود');
    }
  }  
}

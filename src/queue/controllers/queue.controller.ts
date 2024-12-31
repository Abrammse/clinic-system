import { Controller, Get, Query } from '@nestjs/common';
import { Server } from 'socket.io';
import { QueueService } from '../service/queue.service';

@Controller('queue')
export class QueueController {
  private server: Server; // لإرسال التحديثات للعميل

  constructor(private readonly queueService: QueueService) {}

  @Get('waiting-list')
  getWaitingListUpdates() {
    return this.queueService.getWaitingListUpdates();
  }

  @Get('assign-role-numbers')
  async assignRoleNumbers() {
    const result = await this.queueService.assignRoleNumbers();
    return result; // يرجع رسالة النجاح أو الخطأ
  }

  @Get('reset-role-numbers')
  async resetRoleNumbers() {
    const result = await this.queueService.resetRoleNumbers();
    return result; // يرجع رسالة النجاح أو الخطأ
  }
  @Get('set-server')
  setServer(@Query('server') server: Server) {
    this.queueService.setServer(server);
  }
}

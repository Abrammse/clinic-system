// waiting-list.gateway.ts

import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Inject } from '@nestjs/common';
import { QueueService } from '../service/queue.service';

@WebSocketGateway()
export class QueueGateway {
  constructor(@Inject(QueueService) private waitingListService: QueueService) {}

  @SubscribeMessage('getWaitingList')
  handleGetWaitingList(): Observable<any> {
    // هنا ستتم إرسال قائمة الانتظار بشكل فوري
    return this.waitingListService.getWaitingListUpdates();
  }
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { QueueService } from './queue/service/queue.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // تمكين CORS
  app.enableCors();

  // إعداد WebSocket Adapter
  const ioAdapter = new IoAdapter(app);
  app.useWebSocketAdapter(ioAdapter);

  // تعيين مسار API الأساسي
  app.setGlobalPrefix('api');

  // إعداد Socket.io
  const queueService = app.get(QueueService);

  // تعيين الخادم على مستوى الخدمة
  const server = app.getHttpAdapter().getInstance(); // استخدم خادم التطبيق الحالي
  queueService.setServer(server);

  // بدء تشغيل التطبيق
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

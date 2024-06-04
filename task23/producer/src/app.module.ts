import { Module } from '@nestjs/common';
import appConfig from './app.config';
import { AppController } from './app.controller';

import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { rabbitmqProvider } from './rabbitmq.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, rabbitmqProvider],
})
export class AppModule {}

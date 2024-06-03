import { Module } from '@nestjs/common';
import appConfig from './app.config';
import { AppController } from './app.controller';

import { ConfigModule, ConfigType } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TEST_PRODUCER',
      inject: [appConfig.KEY],
      useFactory: (appCfg: ConfigType<typeof appConfig>) => {
        const host = appCfg.RABBITMQ_HOST;
        const port = appCfg.RABBITMQ_PORT;
        const queueName = appCfg.RABBITMQ_QUEUE_NAME;

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${host}:${port}`],
            queue: queueName,
            queueOptions: {
              durable: false,
            },
          },
        });
      },
    },
  ],
})
export class AppModule {}

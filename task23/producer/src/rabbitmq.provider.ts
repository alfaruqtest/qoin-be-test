import { FactoryProvider } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import appConfig from './app.config';

export const TEST_PRODUCER = Symbol('TEST_PRODUCER');

export const rabbitmqProvider: FactoryProvider = {
  provide: TEST_PRODUCER,
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
};

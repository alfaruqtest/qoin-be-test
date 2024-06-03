import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTestDTO, UpdateTestDTO } from './app.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('TEST_PRODUCER')
    private readonly rabbit: ClientProxy,
  ) {}

  createTest(body: CreateTestDTO): string {
    this.rabbit.emit('test-created', {
      command: 'create',
      data: {
        Nama: body.nama,
        Status: body.status,
      },
    });
    return 'success insert new test';
  }

  updateTestByID(id: number, body: UpdateTestDTO): string {
    this.rabbit.emit('test-updated', {
      command: 'update',
      data: {
        ID: id,
        Nama: body.nama,
        Status: body.status,
      },
    });

    return `success update test ${id}`;
  }

  deleteTestByID(id: number): string {
    this.rabbit.emit('test-deleted', {
      command: 'delete',
      data: {
        ID: id,
      },
    });

    return `success delete test ${id}`;
  }
}

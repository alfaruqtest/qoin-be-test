import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { eq } from 'drizzle-orm';
import { CreateTestDTO, UpdateTestDTO } from './app.dto';
import { Test01, test01 } from './app.schema';
import { DRIZZLE_PROVIDER, DrizzleMaria } from './database/drizzle.provider';

@Injectable()
export class AppService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleMaria,
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

  async getTestByID(id: number): Promise<Test01> {
    if (isNaN(id)) throw new NotFoundException();

    const [test] = await this.db.select().from(test01).where(eq(test01.id, id));
    if (!test) throw new NotFoundException();

    return test;
  }

  async getTestList(limit: number, offset: number): Promise<Test01[]> {
    if (isNaN(limit)) limit = 20;
    if (isNaN(offset)) offset = 0;

    const tests = await this.db
      .select()
      .from(test01)
      .limit(limit)
      .offset(offset);

    return tests;
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

  getHello(): string {
    return 'Hello World!';
  }
}

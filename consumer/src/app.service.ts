import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { eq } from 'drizzle-orm';
import {
  CreateTestPayload,
  DeleteTestPayload,
  UpdateTestPayload,
} from './app.payload';
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

  async createTest(body: CreateTestPayload) {
    const test = new CreateTestPayload(body);
    await this.db.insert(test01).values(test);
  }

  async getTestByID(id: number): Promise<Test01> {
    if (isNaN(id)) throw new NotFoundException();

    const [test] = await this.db.select().from(test01).where(eq(test01.Id, id));
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

  async updateTestByID(body: UpdateTestPayload) {
    const test = new UpdateTestPayload(body);
    await this.db.update(test01).set(test).where(eq(test01.Id, test.ID));
  }

  async deleteTestByID(body: DeleteTestPayload) {
    const test = new DeleteTestPayload(body);
    await this.db.delete(test01).where(eq(test01.Id, test.ID));
  }

  getHello(): string {
    return 'Hello World!';
  }
}

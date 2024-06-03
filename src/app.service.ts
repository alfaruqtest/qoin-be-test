import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { CreateTestDTO, UpdateTestDTO } from './app.dto';
import { Test01, test01 } from './app.schema';
import { DRIZZLE_PROVIDER, DrizzleMaria } from './database/drizzle.provider';

@Injectable()
export class AppService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleMaria,
  ) {}

  async createTest(body: CreateTestDTO): Promise<string> {
    await this.db.insert(test01).values(body);

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

  async updateTestByID(id: number, body: UpdateTestDTO): Promise<string> {
    if (isNaN(id)) throw new NotFoundException();

    await this.db.update(test01).set(body).where(eq(test01.id, id));

    return `success update test ${id}`;
  }

  getHello(): string {
    return 'Hello World!';
  }
}

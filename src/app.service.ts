import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { CreateTestDTO } from './app.dto';
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

  getHello(): string {
    return 'Hello World!';
  }
}

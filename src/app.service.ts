import { Inject, Injectable } from '@nestjs/common';
import { CreateTestDTO } from './app.dto';
import { test01 } from './app.schema';
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

  getHello(): string {
    return 'Hello World!';
  }
}

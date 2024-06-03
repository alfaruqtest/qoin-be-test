import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import {
  CreateTestPayload,
  DeleteTestPayload,
  UpdateTestPayload,
} from './app.payload';
import { test01 } from './app.schema';
import { DRIZZLE_PROVIDER, DrizzleMaria } from './database/drizzle.provider';

@Injectable()
export class AppService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleMaria,
  ) {}

  async createTest(body: CreateTestPayload) {
    const test = new CreateTestPayload(body);
    await this.db.insert(test01).values(test);
  }

  async updateTestByID(body: UpdateTestPayload) {
    const test = new UpdateTestPayload(body);
    await this.db.update(test01).set(test).where(eq(test01.Id, test.ID));
  }

  async deleteTestByID(body: DeleteTestPayload) {
    const test = new DeleteTestPayload(body);
    await this.db.delete(test01).where(eq(test01.Id, test.ID));
  }
}

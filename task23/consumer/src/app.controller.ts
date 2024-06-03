import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  CreateTestPayload,
  DeleteTestPayload,
  PayloadTest,
  UpdateTestPayload,
} from './app.payload';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('test-created')
  async handleCreateTest(@Payload() payload: PayloadTest<CreateTestPayload>) {
    await this.appService.createTest(payload.data);
  }

  @EventPattern('test-updated')
  async updateTestByID(@Payload() payload: PayloadTest<UpdateTestPayload>) {
    await this.appService.updateTestByID(payload.data);
  }

  @EventPattern('test-deleted')
  async deleteTestByID(@Payload() payload: PayloadTest<DeleteTestPayload>) {
    await this.appService.deleteTestByID(payload.data);
  }
}

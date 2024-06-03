import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
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

  @Get('test/:id')
  async getTestByID(@Param('id') id: number) {
    const resp = await this.appService.getTestByID(id);
    return { data: resp };
  }

  @Get('test')
  async getTestList(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    const resp = await this.appService.getTestList(limit, offset);
    return { data: resp };
  }

  @EventPattern('test-updated')
  async updateTestByID(@Payload() payload: PayloadTest<UpdateTestPayload>) {
    await this.appService.updateTestByID(payload.data);
  }

  @EventPattern('test-deleted')
  async deleteTestByID(@Payload() payload: PayloadTest<DeleteTestPayload>) {
    await this.appService.deleteTestByID(payload.data);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

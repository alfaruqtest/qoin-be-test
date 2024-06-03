import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  CreateTestPayload,
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

  @Delete('test/:id')
  deleteTestByID(@Param('id') id: number) {
    const resp = this.appService.deleteTestByID(id);
    return { message: resp };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

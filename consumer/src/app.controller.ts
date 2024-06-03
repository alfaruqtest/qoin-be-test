import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
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

  @Put('test/:id')
  updateTestByID(@Param('id') id: number, @Body() body: UpdateTestPayload) {
    const resp = this.appService.updateTestByID(id, body);
    return { message: resp };
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

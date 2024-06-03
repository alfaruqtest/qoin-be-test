import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTestDTO, UpdateTestDTO } from './app.dto';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('test-created')
  async handleCreateTest(@Payload() body: CreateTestDTO) {
    await this.appService.createTest(body);
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
  updateTestByID(@Param('id') id: number, @Body() body: UpdateTestDTO) {
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
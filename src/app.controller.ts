import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTestDTO } from './app.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('test')
  async createTest(@Body() body: CreateTestDTO) {
    const resp = await this.appService.createTest(body);
    return { message: resp };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

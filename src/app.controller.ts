import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('test/:id')
  async getTestByID(@Param('id') id: number) {
    const resp = await this.appService.getTestByID(id);
    return { data: resp };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CreateTestDTO, UpdateTestDTO } from './app.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('test')
  createTest(@Body() body: CreateTestDTO) {
    const resp = this.appService.createTest(body);
    return { message: resp };
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
}

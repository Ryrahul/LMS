import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateTestWithQuestionsDTO } from './dto/Test.dto';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private testservice: TestService) {}
  @Post()
  createTest(@Body() dto: CreateTestWithQuestionsDTO) {
    return this.testservice.createTestWithQuestions(dto);
  }
  @Get('/:id')
  getTest(@Param('id', ParseIntPipe) id: number) {
    return this.testservice.getTestByid(id);
  }
  @Get()
  getAlltest() {}
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTestWithQuestionsDTO } from './dto/Test.dto';
import { TestService } from './test.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { TeacherGuard } from 'src/auth/teacher.guard';

@Controller('test')
export class TestController {
  constructor(private testservice: TestService) {}
  @UseGuards(JwtAuthGuard,TeacherGuard)
  @Post()
  createTest(@Body() dto: CreateTestWithQuestionsDTO) {
    return this.testservice.createTestWithQuestions(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getTest(@Param('id', ParseIntPipe) id: number) {
    return this.testservice.getTestByid(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getAlltest() {}
}

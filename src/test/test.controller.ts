import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateTestWithQuestionsDTO, UpdateTestWithQuestionsDTO } from './dto/Test.dto';
import { TestService } from './test.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { TeacherGuard } from 'src/auth/teacher.guard';

@Controller('test')
export class TestController {
  constructor(private testservice: TestService) {}
  @UseGuards(JwtAuthGuard, TeacherGuard)
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
  getAlltest() {
    return this.testservice.getTest()
  }
  
    @Put(':id')
  async updateTestWithQuestions(@Param('id',ParseIntPipe) testId:number , @Body() updateTestDTO: UpdateTestWithQuestionsDTO) {
    try {
      const updatedTest = await this.testservice.updateTestWithQuestions(testId, updateTestDTO);
      return updatedTest;
    } catch (error) {
      if (error instanceof NotFoundException) {
    
      }
     
      throw error;
    }
  }
}


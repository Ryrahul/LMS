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
import {
  CreateTestWithQuestionsDTO,
  UpdateTestWithQuestionsDTO,
} from './dto/Test.dto';
import { TestService } from './test.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { TeacherGuard } from 'src/Guards/teacher.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
@ApiBearerAuth() // Requires authentication
@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private testservice: TestService) {}
  @UseGuards(JwtAuthGuard, TeacherGuard)
  @Post()
  @ApiOperation({ summary: 'Create Course' })
  @ApiBody({ type: CreateTestWithQuestionsDTO })
  createTest(@Body() dto: CreateTestWithQuestionsDTO) {
    return this.testservice.createTestWithQuestions(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiOperation({ summary: 'Get test' })
  @ApiParam({
    name: 'id',
    description: 'ID of the subject',
    type: 'number',
  })
  getTest(@Param('id', ParseIntPipe) id: number) {
    return this.testservice.getTestByid(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get tests' })
  getAlltest() {
    return this.testservice.getTest();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Get test' })
  @ApiParam({
    name: 'testId',
    description: 'ID of the subject',
    type: 'number',
  })
  async updateTestWithQuestions(
    @Param('id', ParseIntPipe) testId: number,
    @Body() updateTestDTO: UpdateTestWithQuestionsDTO,
  ) {
    try {
      const updatedTest = await this.testservice.updateTestWithQuestions(
        testId,
        updateTestDTO,
      );
      return updatedTest;
    } catch (error) {
      if (error instanceof NotFoundException) {
      }

      throw error;
    }
  }
}

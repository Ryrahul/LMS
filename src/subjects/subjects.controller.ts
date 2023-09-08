import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDTO } from './dto/CreateSubject.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/courses/courses.guard';

@Controller('subjects')
export class SubjectsController {
  constructor(private subjectservices: SubjectsService) {}
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  createSubject(@Body() dto: CreateSubjectDTO) {
    return this.subjectservices.createCourse(dto);
  }
  @Delete('/:id')
  deleteSubject(@Param('id', ParseIntPipe) id: number) {
    return this.subjectservices.deleteCourse(id);
  }
  @Get()
  getSubject(@Param('courseId', ParseIntPipe) courseId: number) {}
}

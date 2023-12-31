import {
  Controller,
  UseGuards,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateCourseDto } from './dto/CreateCourse.dto';
import { CourseService } from './courses.services';
import { UpdateCourseDTO } from './dto/UpdateCourse.dto';
import { AdminGuard } from 'src/Guards/course.guard';

@Controller('courses')
export class CoursesController {
  constructor(private course: CourseService) {}
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  createcourse(@Body() dto: CreateCourseDto) {
    return this.course.CreateCourse(dto);
  }
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put('/:id')
  updatecourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCourseDTO,
  ) {
    return this.course.UpdateCourse(dto, id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  viewcourse() {
    return this.course.getCourse();
  }
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('/:id')
  deletecourse(@Param('id', ParseIntPipe) id: number) {
    return this.course.deleteCourse(id);
  }
}

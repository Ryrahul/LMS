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
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
@ApiBearerAuth() // Requires authentication
@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private course: CourseService) {}
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  @ApiOperation({ summary: 'Create Course' })
  @ApiBody({ type: CreateCourseDto })
  createcourse(@Body() dto: CreateCourseDto) {
    return this.course.CreateCourse(dto);
  }
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put('/:id')
  @ApiOperation({ summary: 'Update Course' })
  @ApiParam({ name: 'id', description: 'ID of the course', type: 'number' })
  @ApiBody({ type: UpdateCourseDTO })
  updatecourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCourseDTO,
  ) {
    return this.course.UpdateCourse(dto, id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  viewcourse() {
    return this.course.getCourse();
  }
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete courses' })
  @ApiParam({ name: 'id', description: 'ID of the attendance', type: 'number' })
  deletecourse(@Param('id', ParseIntPipe) id: number) {
    return this.course.deleteCourse(id);
  }
}

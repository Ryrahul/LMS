import { Controller, UseGuards,Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateCourseDto } from './dto/CreateCourse.dto';
import { CourseService } from './courses.services';
import { AdminGuard } from './courses.guard';



@Controller('courses')
export class CoursesController {
    constructor(private course:CourseService){}
    @UseGuards(JwtAuthGuard,AdminGuard)
  @Post('add')
  createcourse(@Body()dto:CreateCourseDto){
    return this.course.CreateCourse(dto)


  }
}

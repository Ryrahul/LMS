import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CourseService } from './courses.services';

@Module({
  controllers: [CoursesController],
  providers:[CourseService]

})
export class CoursesModule {}

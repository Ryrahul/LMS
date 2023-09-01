import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CourseService } from './courses.services';
import { AdminGuard } from './courses.guard';

@Module({
  controllers: [CoursesController],
  providers: [CourseService]
})
export class CoursesModule {}

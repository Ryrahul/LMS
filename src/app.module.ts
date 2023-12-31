import { Module } from '@nestjs/common';

import { CoursesModule } from './courses/courses.module';
import { SubjectsModule } from './subjects/subjects.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';
import { FeedbackModule } from './feedback/feedback.module';
import { StudyMaterialModule } from './study-material/study-material.module';
import { AttendanceModule } from './attendance/attendance.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CoursesModule,
    AuthModule,
    SubjectsModule,
    PrismaModule,
    TestModule,
    FeedbackModule,
    StudyMaterialModule,
    AttendanceModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

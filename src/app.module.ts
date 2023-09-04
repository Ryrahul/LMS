import { Module } from '@nestjs/common';

import { CoursesModule } from './courses/courses.module';
import { SubjectsModule } from './subjects/subjects.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';
import { FeedbackModule } from './feedback/feedback.module';
import { StudyMaterialModule } from './study-material/study-material.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

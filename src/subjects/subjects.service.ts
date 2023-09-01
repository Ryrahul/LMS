import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from 'src/courses/dto/CreateCourse.dto';
import { PrismaService } from 'src/prisma/prisma.services';
import { CreateSubjectDTO } from './dto/CreateSubject.dto';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}
  async createCourse(dto: CreateSubjectDTO) {
    try {
      const subject = await this.prisma.subject.create({
        data: {
          title: dto.title,
          courseId: dto.courseId,
        },
      });
      return subject;
    } catch (e) {
      return e.message;
    }
  }
  async deleteCourse(id: number) {
    const course = await this.prisma.subject.delete({
      where: {
        id,
      },
    });
    return {
      message: 'Subject deleted succesfully',
      deletedSubject: course,
    };
  }
}

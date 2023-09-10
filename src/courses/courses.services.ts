import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { CreateCourseDto } from './dto/CreateCourse.dto';
import { UpdateCourseDTO } from './dto/UpdateCourse.dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}
  async CreateCourse(dto: CreateCourseDto) {
    try {
      const course = await this.prisma.course.create({
        data: {
          name: dto.name,
          description: dto.description,
          student: {
            connect: dto.studentIds.map((studentId) => ({ id: studentId })),
          },
          subjects: {
            connect: dto.subjectIds.map((subjectsId) => ({ id: subjectsId })),
          },
        },
      });
      return course;
    } catch (e) {
      console.log(e)
      return e.message;
    }
  }
  async UpdateCourse(dto: UpdateCourseDTO, id: number) {
    try {
      const course = await this.prisma.course.update({
        where: { id: id },
        data: {
          description: dto.description,
          student: {
            connect:
              dto.addedStudentIds.map((studentId) => ({ id: studentId })) || [],
            disconnect:
              dto.removedStudentIds.map((students) => ({ id: students })) || [],
          },
          subjects: {
            connect: dto.subjectIds.map((subjectsId) => ({ id: subjectsId })),
          },
        },
      });

      return course;
    } catch (e) {
      return e.message;
    }
  }
  async getCourse() {
    return this.prisma.course.findMany();
  }
  async deleteCourse(id: number) {
    const course = await this.prisma.course.delete({
      where: { id },
    });
    return { message: ' Course has been deleted', deletedCourse: course };
  }
}

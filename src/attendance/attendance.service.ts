import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { AttendanceDto, updateAttendacneDTO } from './dto/attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}
  async CreateAttendacne(dto: AttendanceDto, subjectId: number) {
    try {
      const attendance = await this.prisma.attendance.create({
        data: {
          date: dto.date,
          subjectId: subjectId,
          studentId: dto.studentId,
        },
      });
      return attendance;
    } catch (e) {
      return e.message;
    }
  }
  async getAttendacne(subjectId: number, UserId: number) {
    try {
      const total_class = await this.prisma.attendance.count({
        where: {
          subjectId: subjectId,
        },
      });
      const attended_class = await this.prisma.attendance.count({
        where: {
          studentId: UserId,
        },
      });
      const attendace = (attended_class / total_class) * 100;
      return {
        attendace: attendace,
      };
    } catch (e) {
      return e.message;
    }
  }
  async updateAttendance(
    Id: number,
    dto: updateAttendacneDTO,
    subjectId: number,
  ) {
    try {
      const updatedAttendance = await this.prisma.attendance.update({
        where: {
          id: Id,
        },
        data: {
          subjectId: subjectId,
          ...dto,
        },
      });
      return updatedAttendance;
    } catch (e) {
      return e.message;
    }
  }
  async deleteAttendacne(id: number) {
    try {
      const attendance = await this.prisma.attendance.delete({
        where: {
          id: id,
        },
      });
      return {
        message: 'Deleted Succesfully',
        deleted_Attendacne: attendance,
      };
    } catch (e) {
      return e.message;
    }
  }
}

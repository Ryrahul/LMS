import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { AttendanceDto } from './dto/attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}
  async CreateAttendacne(dto: AttendanceDto) {
    const attendance = await this.prisma.attendance.create({
      data: {
        date: dto.date,
        subjectId: dto.subjectId,
        studentId: dto.studentId,
      },
    });
    return attendance;
  }
  async getAttendacne(subjectId:number,UserId:number){
    const total_class=await this.prisma.attendance.count({
        where:{
            subjectId:subjectId
        }
    })
    const attended_class=await this.prisma.attendance.count({
        where:{
            studentId:UserId
        }
    })
    const attendace=(attended_class/total_class)*100
    return {
        attendace:attendace
    }

  }
}

import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AttendanceDto } from './dto/attendance.dto';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { TeacherGuard } from 'src/auth/teacher.guard';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendaceservice: AttendanceService) {}
  @UseGuards(JwtAuthGuard,TeacherGuard)
  @Post()
  createAttendacne(@Body() dto: AttendanceDto) {
    return this.attendaceservice.CreateAttendacne(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:subjectId/:id')
  getAttendacne(@Param('subjectId',ParseIntPipe)subjectId:number,@Param('id',ParseIntPipe)id:number){
    return this.attendaceservice.getAttendacne(subjectId,id)

  }
}

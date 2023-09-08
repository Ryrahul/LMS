import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AttendanceDto } from './dto/attendance.dto';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { TeacherGuard } from 'src/auth/teacher.guard';
import { AdminGuard } from 'src/courses/courses.guard';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendaceservice: AttendanceService) {}
  @UseGuards(JwtAuthGuard, TeacherGuard)
  @Post('/:subjectId')
  createAttendacne(
    @Body() dto: AttendanceDto,
    @Param('subjectId', ParseIntPipe) subjectId: number,
  ) {
    return this.attendaceservice.CreateAttendacne(dto, subjectId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:subjectId/:id')
  getAttendacne(
    @Param('subjectId', ParseIntPipe) subjectId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.attendaceservice.getAttendacne(subjectId, id);
  }
  @UseGuards(JwtAuthGuard, TeacherGuard)
  @Put()
  updateAttendacne(
    @Param('subjectId', ParseIntPipe) subjectId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {}
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete()
  deleteAttendacne(@Param('id', ParseIntPipe) id: number) {
    return this.attendaceservice.deleteAttendacne(id);
  }
}

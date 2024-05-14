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
import { TeacherGuard } from 'src/Guards/teacher.guard';
import { AdminGuard } from 'src/Guards/course.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
@ApiTags('Attendance')
@ApiBearerAuth() // Requires authentication
@Controller('attendance')
export class AttendanceController {
  constructor(private attendaceservice: AttendanceService) {}
  @UseGuards(JwtAuthGuard, TeacherGuard)
  @Post('/:subjectId')
  @ApiOperation({ summary: 'Create Attendance' })
  @ApiParam({
    name: 'subjectId',
    description: 'ID of the subject',
    type: 'number',
  })
  @ApiBody({ type: AttendanceDto })
  createAttendacne(
    @Body() dto: AttendanceDto,
    @Param('subjectId', ParseIntPipe) subjectId: number,
  ) {
    return this.attendaceservice.CreateAttendacne(dto, subjectId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:subjectId/:id')
  @ApiOperation({ summary: 'Get Attendance' })
  @ApiParam({
    name: 'subjectId',
    description: 'ID of the subject',
    type: 'number',
  })
  @ApiParam({ name: 'id', description: 'ID of the attendance', type: 'number' })
  getAttendacne(
    @Param('subjectId', ParseIntPipe) subjectId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.attendaceservice.getAttendacne(subjectId, id);
  }
  @UseGuards(JwtAuthGuard, TeacherGuard)
  @Put()
  @ApiOperation({ summary: 'Update Attendance' })
  @ApiParam({ name: 'id', description: 'ID of the attendance', type: 'number' })
  @ApiBody({})
  updateAttendacne(
    @Param('subjectId', ParseIntPipe) subjectId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {}
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete()
  @ApiOperation({ summary: 'Delete Attendance' })
  @ApiParam({ name: 'id', description: 'ID of the attendance', type: 'number' })
  deleteAttendacne(@Param('id', ParseIntPipe) id: number) {
    return this.attendaceservice.deleteAttendacne(id);
  }
}

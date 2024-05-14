import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDTO } from './dto/CreateSubject.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/Guards/course.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
@ApiBearerAuth() // Requires authentication
@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private subjectservices: SubjectsService) {}
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  @ApiOperation({ summary: 'Create subject' })
  @ApiBody({ type: CreateSubjectDTO })
  createSubject(@Body() dto: CreateSubjectDTO) {
    return this.subjectservices.createCourse(dto);
  }
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete subject' })
  @ApiParam({ name: 'id', description: 'ID of the attendance', type: 'number' })
  deleteSubject(@Param('id', ParseIntPipe) id: number) {
    return this.subjectservices.deleteCourse(id);
  }
  @Get('/:courseId')
  @ApiOperation({ summary: 'Get subject' })
  @ApiParam({
    name: 'courseId',
    description: 'ID of the subject',
    type: 'number',
  })
  getSubject(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.subjectservices.getCourse(courseId);
  }
}

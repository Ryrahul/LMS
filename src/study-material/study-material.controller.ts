import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateStudyMaterialDto } from './dto/Studymaterial.dto';
import { multerConfig } from './multer.config';
import { StudyMaterialService } from './study-material.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { TeacherGuard } from 'src/auth/teacher.guard';

@Controller('study-material')
export class StudyMaterialController {
  constructor(private studymaterial: StudyMaterialService) {}
  @UseGuards(JwtAuthGuard, TeacherGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateStudyMaterialDto,
  ) {
    return this.studymaterial.createStudyMaterial(file, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getMaterial(@Param('subjectId', ParseIntPipe) subjectId: number) {
    return this.studymaterial.getStudyMaterial(subjectId);
  }
  @UseGuards(JwtAuthGuard, TeacherGuard)
  @Delete()
  async deletematerial(@Param('id', ParseIntPipe) id: number) {
    return this.studymaterial.deleteStudyMaterial(id);
  }
}

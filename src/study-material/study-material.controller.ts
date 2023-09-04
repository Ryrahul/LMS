import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateStudyMaterialDto } from './dto/Studymaterial.dto';
import { multerConfig } from './multer.config';
import { ConfigService } from '@nestjs/config';
import { StudyMaterialService } from './study-material.service';

@Controller('study-material')
export class StudyMaterialController {
  constructor(private studymaterial: StudyMaterialService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateStudyMaterialDto,
  ) {
    return this.studymaterial.createStudyMaterial(file, dto);
  }
}

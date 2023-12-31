import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateStudyMaterialDto } from './dto/Studymaterial.dto';
import { StudyMaterialService } from './study-material.service';
import { TeacherGuard } from 'src/Guards/teacher.guard';

@Controller('study-material')
export class StudyMaterialController {
  constructor(private studymaterial: StudyMaterialService) {}
  @UseGuards(TeacherGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateStudyMaterialDto,
  ) {
    return this.studymaterial.createStudyMaterial(file, dto);
  }
  @UseGuards()
  @Get()
  async getMaterial(@Param('subjectId', ParseIntPipe) subjectId: number) {
    return this.studymaterial.getStudyMaterial(subjectId);
  }
  @UseGuards(TeacherGuard)
  @Delete()
  async deletematerial(@Param('id', ParseIntPipe) id: number) {
    return this.studymaterial.deleteStudyMaterial(id);
  }
  @Post('video')
  @UseInterceptors(FileInterceptor('video'))
  async VideoMaterial(@Body() dto:CreateStudyMaterialDto, @UploadedFile() video:Express.Multer.File){
    return this.studymaterial.createStudyMaterial(video,dto)

    
  }
  @Get(':file_key')
  async GetVideo(@Param('file_key') file_key:string, @Res() res:any){
    const videoStream=await this.studymaterial.GetVideo(file_key)
res.setHeader('Content-Type', 'video/mp4');   
  videoStream
      .format('mp4')
      .videoCodec('libx264')
      .audioCodec('aac')
      .pipe(res, { end: true });
  }


}

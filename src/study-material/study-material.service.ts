import { Injectable, ParseIntPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.services';
import { CreateStudyMaterialDto } from './dto/Studymaterial.dto';
import { randomUUID } from 'crypto';
import { MinioService } from 'src/minio/minio.service';
import * as fluentffmpeg from "fluent-ffmpeg"

@Injectable()
export class StudyMaterialService {
  constructor(
    private prismaservice: PrismaService,
    private configService: ConfigService,
    private readonly minioService:MinioService
  ) {}
  async createStudyMaterial(
    file:Express.Multer.File,
    dto: CreateStudyMaterialDto,
  ) {
    const file_key = randomUUID();
    console.log(file)
    const file_url=await this.minioService.GetfileUrl(file_key)
    await this.minioService.UploadFile(file.buffer,file_key)
    console.log(+dto.subjectId)
    return await this.prismaservice.studyMaterial.create({
      data:{
        fileUrl:file_url,
        title:dto.title,
        fileType:dto.fileType,
        subjectId:+dto.subjectId
      
        

      }
    })
  }
  async getStudyMaterial(subjectId: number) {
    try {
      const studyMaterial = await this.prismaservice.test.findMany({
        where: {
          subjectId,
        },
      });
      return studyMaterial;
    } catch (e) {
      return e.message;
    }
  }
  async deleteStudyMaterial(id: number) {
    try {
      const studyMaterial = await this.prismaservice.test.delete({
        where: { id },
      });
      return {
        message: 'Deleted Successfully',
      };
    } catch (E) {
      return E.message;
    }
  }
  async GetVideo(file_key:string):Promise<any>{
    try{
      const videoStream=await this.minioService.GetObject(file_key)
      return fluentffmpeg().input(videoStream)
    }
    catch(e){
return e.message
    }
  }
}

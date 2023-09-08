import { Injectable, ParseIntPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.services';
import { CreateStudyMaterialDto } from './dto/Studymaterial.dto';

@Injectable()
export class StudyMaterialService {
  constructor(
    private prismaservice: PrismaService,
    private configService: ConfigService,
  ) {}
  async createStudyMaterial(
    file: Express.Multer.File,
    dto: CreateStudyMaterialDto,
  ) {
    const baseUrl = this.configService.get('BASE_URL');
    const fileUrl = `${baseUrl || ''}/uploads/${file.filename}`;
    const studyMaterialData = {
      title: dto.title,
      fileType: dto.fileType,
      subjectId: Number(dto.subjectId),
    };
    console.log(studyMaterialData);

    return this.prismaservice.studyMaterial.create({
      data: {
        ...studyMaterialData,
        fileUrl,
      },
    });
  }
  async getStudyMaterial(subjectId: number) {
    const studyMaterial = await this.prismaservice.test.findMany({
      where: {
        subjectId,
      },
    });
  }
  async deleteStudyMaterial(id: number) {
    const studyMaterial = await this.prismaservice.test.delete({
      where: { id },
    });
    return {
      message: 'Deleted Successfully',
    };
  }
}

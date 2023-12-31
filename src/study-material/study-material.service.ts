import { Injectable, ParseIntPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.services';
import { CreateStudyMaterialDto } from './dto/Studymaterial.dto';
import { retry } from 'rxjs';
import { randomUUID } from 'crypto';

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
    const file_key = randomUUID();
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
}

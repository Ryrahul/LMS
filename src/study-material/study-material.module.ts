import { Module } from '@nestjs/common';
import { StudyMaterialController } from './study-material.controller';
import { StudyMaterialService } from './study-material.service';
import { Minio } from 'src/minio/minio.module';

@Module({
  controllers: [StudyMaterialController],
  providers: [StudyMaterialService],
  imports:[Minio]
})
export class StudyMaterialModule {}

import { Module } from '@nestjs/common';
import { StudyMaterialController } from './study-material.controller';
import { StudyMaterialService } from './study-material.service';

@Module({
  controllers: [StudyMaterialController],
  providers: [StudyMaterialService],
})
export class StudyMaterialModule {}

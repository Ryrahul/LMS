import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNotEmpty,
  IsMimeType,
  IsNumber,
  isNumber,
  IsInt,
} from 'class-validator';

export class CreateStudyMaterialDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fileType: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  subjectId: number;
}

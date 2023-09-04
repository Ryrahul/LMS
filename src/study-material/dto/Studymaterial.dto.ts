import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsMimeType, IsNumber, isNumber, IsInt } from 'class-validator';

export class CreateStudyMaterialDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  fileType: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  subjectId: number;
}

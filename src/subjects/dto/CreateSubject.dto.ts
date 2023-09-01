import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateSubjectDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  courseId: number;
}

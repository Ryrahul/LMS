import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  studentIds: number[]; 

  @IsArray()
  @IsOptional()
  subjectIds: number[]; 
}
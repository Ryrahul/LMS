// update-course.dto.ts

import { IsOptional, IsArray, IsNumber } from 'class-validator';

export class UpdateCourseDTO {
  @IsOptional()
  description: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  addedStudentIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  removedStudentIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  subjectIds?: number[];
}

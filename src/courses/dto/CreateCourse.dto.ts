import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsArray()
  @IsOptional()
  studentIds: number[];
  @ApiProperty()
  @IsArray()
  @IsOptional()
  subjectIds: number[];
}

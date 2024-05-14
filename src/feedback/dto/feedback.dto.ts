import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FeedbackDto {
  @ApiProperty()
  text: string;
  @ApiProperty()
  @IsNotEmpty()
  rating: number;
  @ApiProperty()
  @IsNotEmpty()
  courseId: number;
  @ApiProperty()
  @IsNotEmpty()
  subjectId: number;
  @ApiProperty()
  @IsNotEmpty()
  authorId: number;
}

import { IsNotEmpty } from 'class-validator';

export class FeedbackDto {
  text: string;
  @IsNotEmpty()
  rating: number;
  @IsNotEmpty()
  courseId: number;
  @IsNotEmpty()
  subjectId: number;
  @IsNotEmpty()
  authorId: number;
}

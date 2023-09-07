import { IsNotEmpty, IsNumber } from 'class-validator';

export class AttendanceDto {
  @IsNotEmpty()
  date: Date;
  @IsNotEmpty()
  @IsNumber()
  studentId: number;
  @IsNumber()
  subjectId: number;
}

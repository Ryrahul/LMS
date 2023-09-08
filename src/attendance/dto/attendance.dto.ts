import { IsNotEmpty, IsNumber } from 'class-validator';

export class AttendanceDto {
  @IsNotEmpty()
  date: Date;
  @IsNotEmpty()
  @IsNumber()
  studentId: number;
}
export class updateAttendacneDTO {
  @IsNumber()
  studentId: number;
}

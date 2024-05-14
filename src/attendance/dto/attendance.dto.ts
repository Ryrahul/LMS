import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AttendanceDto {
  @ApiProperty()
  @IsNotEmpty()
  date: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  studentId: number;
}
export class updateAttendacneDTO {
  @ApiProperty()
  @IsNumber()
  studentId: number;
}

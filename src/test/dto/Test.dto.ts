import {
  IsString,
  IsUUID,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestWithQuestionsDTO {
  title: string;
  subjectId: number;
  questions: CreateQuestionWithChoicesDTO[];
}

export class CreateQuestionWithChoicesDTO {
  text: string;
  choices: CreateChoiceDTO[];
}

export class CreateChoiceDTO {
  text: string;
  isCorrect: boolean;
}

class UpdateChoiceDTO {
  @ApiProperty()
  @IsString()
  text: string;

  @IsBoolean()
  isCorrect: boolean;
  id: number;
}

class UpdateQuestionDTO {
  @ApiProperty()
  @IsString()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateChoiceDTO)
  choices: UpdateChoiceDTO[];
  id: number;
}

export class UpdateTestWithQuestionsDTO {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsNumber()
  subjectId: number;
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionDTO)
  questions: UpdateQuestionDTO[];
}

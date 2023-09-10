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
  @IsString()
  text: string;

  @IsBoolean()
  isCorrect: boolean;
  id: number;
}

class UpdateQuestionDTO {
  @IsString()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateChoiceDTO)
  choices: UpdateChoiceDTO[];
  id: number;
}

export class UpdateTestWithQuestionsDTO {
  @IsString()
  title: string;

@IsNumber()
  subjectId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionDTO)
  questions: UpdateQuestionDTO[];
}

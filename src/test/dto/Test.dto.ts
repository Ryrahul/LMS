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

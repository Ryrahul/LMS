import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTestWithQuestionsDTO,
  UpdateTestWithQuestionsDTO,
} from './dto/Test.dto';
import { PrismaService } from 'src/prisma/prisma.services';

@Injectable()
export class TestService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTestWithQuestions(createTestDTO: CreateTestWithQuestionsDTO) {
    const { title, subjectId, questions } = createTestDTO;
    try {
      const result = await this.prismaService.$transaction(async (prisma) => {
        const test = await prisma.test.create({
          data: {
            title,
            subjectId,
            questions: {
              create: questions.map((q) => ({
                text: q.text,
                choices: {
                  create: q.choices.map((choice) => ({
                    text: choice.text,
                    isCorrect: choice.isCorrect,
                  })),
                },
              })),
            },
          },
        });
        return test;
      });
      return result;
    } catch (e) {
      return e.message;
    }
  }
  async getTestByid(id: number): Promise<object> {
    try {
      const test = await this.prismaService.test.findUnique({
        where: { id },
        include: { questions: { include: { choices: true } } },
      });
      return test;
    } catch (E) {
      return E.message;
    }
  }
  async getTest(): Promise<object> {
    try {
      const test = await this.prismaService.test.findMany();
      return test;
    } catch (E) {
      return E.message;
    }
  }
  async updateTestWithQuestions(
    testId: number,
    dto: UpdateTestWithQuestionsDTO,
  ) {
    try {
      const { title, subjectId, questions } = dto;

      const existingTest = await this.prismaService.test.findUnique({
        where: {
          id: testId,
        },
        include: {
          questions: {
            include: {
              choices: true,
            },
          },
        },
      });

      if (!existingTest) {
        throw new NotFoundException('Test not found');
      }

      const updatedTest = await this.prismaService.test.update({
        where: {
          id: testId,
        },
        data: {
          title,
          subjectId,
        },
      });

      const updatedQuestions = [];

      for (const q of questions) {
        const existingQuestion = existingTest.questions.find(
          (eq) => eq.id === q.id,
        );

        if (existingQuestion) {
          const updatedQuestion = await this.prismaService.question.update({
            where: {
              id: existingQuestion.id,
            },
            data: {
              text: q.text,
            },
          });

          const updatedChoices = [];

          for (const choice of q.choices) {
            const existingChoice = existingQuestion.choices.find(
              (ec) => ec.id === choice.id,
            );

            if (existingChoice) {
              const updatedChoice = await this.prismaService.choice.update({
                where: {
                  id: existingChoice.id,
                },
                data: {
                  text: choice.text,
                  isCorrect: choice.isCorrect,
                },
              });

              updatedChoices.push(updatedChoice);
            } else {
              const newChoice = await this.prismaService.choice.create({
                data: {
                  text: choice.text,
                  isCorrect: choice.isCorrect,
                  questionId: updatedQuestion.id,
                },
              });

              updatedChoices.push(newChoice);
            }
          }

          existingQuestion.choices = updatedChoices;
          updatedQuestions.push(updatedQuestion);
        } else {
          const newQuestion = await this.prismaService.question.create({
            data: {
              text: q.text,
              testId: updatedTest.id,
              choices: {
                create: q.choices.map((choice) => ({
                  text: choice.text,
                  isCorrect: choice.isCorrect,
                })),
              },
            },
          });

          updatedQuestions.push(newQuestion);
        }
      }

      existingTest.questions = updatedQuestions;

      return updatedTest;
    } catch (E) {
      return E.message;
    }
  }
}

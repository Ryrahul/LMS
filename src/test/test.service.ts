import { Injectable } from '@nestjs/common';
import { CreateTestWithQuestionsDTO } from './dto/Test.dto';
import { PrismaService } from 'src/prisma/prisma.services';

@Injectable()
export class TestService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTestWithQuestions(createTestDTO: CreateTestWithQuestionsDTO) {
    const { title, subjectId, questions } = createTestDTO;

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
  }
  async getTestByid(id: number): Promise<object> {
    const test = await this.prismaService.test.findUnique({
      where: { id },
      include: { questions: { include: { choices: true } } },
    });
    return test;
  }
  async getTest(): Promise<object> {
    const test = await this.prismaService.test.findMany();
    return test;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { FeedbackDto } from './dto/feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private prismaservice: PrismaService) {}
  async CreateFeedback(dto: FeedbackDto) {
    try{
    const feedback = await this.prismaservice.feedback.create({
      data: {
        ...dto,
      },
    });
    return feedback;
  }
  catch(e){
    return e.message
  }
  }
  async GetFeedback(subjectId: number) {
    try{
    const feedback = await this.prismaservice.feedback.findMany({
      where: { subjectId: subjectId },
    });
    return feedback;
  }
  catch(e){
    return e.message
  }
  }
  async deleteFeedback(id: number) {
    try{
    const feedback = await this.prismaservice.feedback.delete({
      where: {
        id: id,
      },
    });
    return {
      message: 'deleted Feedback',
    };
  }
  catch(e){
    e.message
  }
  }
}

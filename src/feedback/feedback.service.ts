import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { FeedbackDto } from './dto/feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private prismaservice: PrismaService) {}
  async CreateFeedback(dto: FeedbackDto) {
    const feedback = await this.prismaservice.feedback.create({
      data: {
        ...dto,
      },
    });
    return feedback;
  }
  async GetFeedback(subjectId:number){
    const feedback=await this.prismaservice.feedback.findMany({
      where:{subjectId:subjectId}
    })
    return feedback
  }
  async deleteFeedback(id:number){
    const feedback=await this.prismaservice.feedback.delete({
      where:{
        id:id
      }
    })
    return {
      message:"deleted Feedback"
    }
  }
  
}

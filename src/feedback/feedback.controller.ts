import { Body, Controller, Post,Get, ParseIntPipe,Param, UseGuards, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackDto } from './dto/feedback.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackservice: FeedbackService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  createFeedback(@Body() dto: FeedbackDto) {
    return this.feedbackservice.CreateFeedback(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getFeedback(@Param('subjectId',ParseIntPipe)subjectId:number){
    return this.feedbackservice.GetFeedback(subjectId)

  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteFeedback(@Param('Id',ParseIntPipe)Id:number){
    return this.feedbackservice.deleteFeedback(Id)

  }

}

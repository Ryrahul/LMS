import { Body, Controller, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackDto } from './dto/feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackservice: FeedbackService) {}
  @Post()
  createFeedback(@Body() dto: FeedbackDto) {
    return this.feedbackservice.CreateFeedback(dto);
  }
}

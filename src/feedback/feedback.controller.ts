import {
  Body,
  Controller,
  Post,
  Get,
  ParseIntPipe,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackDto } from './dto/feedback.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
@ApiBearerAuth() // Requires authentication
@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackservice: FeedbackService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create Feedback' })
  @ApiBody({ type: FeedbackDto })
  createFeedback(@Body() dto: FeedbackDto) {
    return this.feedbackservice.CreateFeedback(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get feedback' })
  @ApiParam({
    name: 'subjectId',
    description: 'ID of the subject',
    type: 'number',
  })
  getFeedback(@Param('subjectId', ParseIntPipe) subjectId: number) {
    return this.feedbackservice.GetFeedback(subjectId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiOperation({ summary: 'Delete feedback' })
  @ApiParam({ name: 'id', description: 'ID of the attendance', type: 'number' })
  deleteFeedback(@Param('Id', ParseIntPipe) Id: number) {
    return this.feedbackservice.deleteFeedback(Id);
  }
}

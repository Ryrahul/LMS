import { Body, Controller, Post } from '@nestjs/common';
import { CreateTestWithQuestionsDTO } from './dto/Test.dto';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
    constructor(private testservice:TestService){}
    @Post()
    createTest(@Body()dto:CreateTestWithQuestionsDTO){
        return this.testservice.createTestWithQuestions(dto)
    }
}

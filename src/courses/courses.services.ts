import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.services";
import { CreateCourseDto } from "./dto/CreateCourse.dto";

@Injectable()
export class CourseService{
    
    constructor(private prisma:PrismaService){}
    async CreateCourse(dto:CreateCourseDto){
        try{
        const course= await this.prisma.course.create({
            data:{
                ...dto
            }
        })
        return course
    }
    catch(e){
        return e.message
    }
    }


    }
    
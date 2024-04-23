import { PrismaService } from 'src/prisma/prisma.services';
import { UpdateUserDto } from './dto/Update.user.dto';
import * as bcrypt from 'bcrypt';

export class UserService {
  constructor(private readonly prisma: PrismaService) {}
 async FindUserByUsername(username:string){
  return await this.prisma.user.findUnique({
    where:{
      username
    }
  })

 }
  async ChangeEmail(dto: UpdateUserDto) {
    try {
      const student = await this.prisma.user.findUnique({
        where: {
          username: dto.username,
        },
      });
      if (await bcrypt.compare(dto.password, student.password)) {
        return await this.prisma.user.update({
          where: {
            username: dto.username,
          },
          data: {
            email: dto.email,
          },
        });
      }
      return {
        message: 'Credentials Mismatch',
      };
    } catch (e) {
      return e.message;
    }
  }
}

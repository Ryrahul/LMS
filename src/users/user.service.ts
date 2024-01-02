import { PrismaService } from 'src/prisma/prisma.services';
import { UpdateUserDto } from './dto/Update.user.dto';
import * as bcrypt from 'bcrypt';

export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async FindUserByUsername(username: string) {
    try{
    return await this.prismaService.user.findUnique({
      where: {
        username
      },
    });
}
catch(e){
    return e.message
}
  }
  async ChangeEmail(dto: UpdateUserDto) {
    try {
      const student = await this.prismaService.user.findUnique({
        where: {
          username: dto.username,
        },
      });
      if (await bcrypt.compare(dto.password, student.password)) {
        return await this.prismaService.user.update({
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

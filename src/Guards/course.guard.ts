import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;

    const isAdmin = await this.isUserAdmin(userId);
    console.log(isAdmin);

    return isAdmin;
  }

  async isUserAdmin(userId: number): Promise<boolean> {
    if (!userId) {
      return false;
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    return user?.role === 'admin';
  }
}

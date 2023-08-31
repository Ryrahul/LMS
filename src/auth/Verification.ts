import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
@Injectable()
export class VerificationService {
  constructor(private prisma: PrismaService) {}
  async verification(id: number) {
    const Verified = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    const status = Verified.Verified;

    if (!status) {
      return false;
    }
    return true;
  }
}

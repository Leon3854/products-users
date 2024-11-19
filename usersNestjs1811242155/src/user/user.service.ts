import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async resetProblemsFlag(): Promise<number> {
    const usersWithProblems = await this.prisma.user.findMany({
      where: { hasProblems: true },
    });
    const count = usersWithProblems.length;

    await this.prisma.user.updateMany({
      where: { hasProblems: true },
      data: { hasProblems: false },
    });

    return count;
  }
}

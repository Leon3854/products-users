import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Сбрасываем флаг hasProblems для всех пользователей и возвращаем количество обновленных записей
  async resetProblemsFlag(): Promise<number> {
    /// Находим всех пользователей с установленным флагом hasProblems = true
    const usersWithProblems = await this.prisma.user.findMany({
      where: { hasProblems: true },
    });
    // Получаем количество таких пользователей
    const count = usersWithProblems.length;

   // Обновляем всех пользователей, у которых hasProblems = true, сбрасывая этот флаг (устанавливаем false)
    await this.prisma.user.updateMany({
      where: { hasProblems: true },
      data: { hasProblems: false },
    });

    return count;
  }
}

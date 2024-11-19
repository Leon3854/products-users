import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting the user seeding process...'); // Лог начала процесса
  const users = [];
  for (let i = 0; i < 100; i++) {
    users.push({
      // Обновлено
      firstName: faker.person.firstName(),
      // Обновлено
      lastName: faker.person.lastName(),
      // Используется актуальный метод
      age: faker.number.int({ min: 18, max: 90 }),
      // Используется актуальный метод
      gender: faker.person.gender(),
      hasProblems: faker.datatype.boolean(),
    });
    // Лог для отслеживания прогресса
    if (i % 10 === 0) {
      // Каждые 10 пользователей
      console.log(`Generated ${i} users...`);
    }
  }
  // Лог перед созданием пользователей
  console.log('About to create users in the database...');
  await prisma.user.createMany({ data: users });
  // Лог после успешного создания пользователей
  console.log('Successfully created users in the database.');
}

main()
  .catch((error) => {
    // Лог для ошибок
    console.error('Error during seeding:', error);
  })
  .finally(async () => {
    // Лог перед отключением
    console.log('Disconnecting from the database...');
    await prisma.$disconnect();
    // Лог после отключения
    console.log('Disconnected from the database.');
  });

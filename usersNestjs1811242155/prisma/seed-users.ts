import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Функция для генерации и добавления 100 фейковых пользователей в базу данных
async function main() {
  console.log('Starting the user seeding process...'); // Лог начала процесса
  const users = [];
  for (let i = 0; i < 100; i++) {
    users.push({
      firstName: faker.person.firstName(), //Фамилия пользователя
      lastName: faker.person.lastName(), //Имя пользователя
      age: faker.number.int({ min: 18, max: 90 }), //Возраст пользователя от 18 до 90
      gender: faker.person.gender(), // Гендер пользователя
      hasProblems: faker.datatype.boolean(), //Флаг наличия проблем
    });
    // Отслеоживаем прогресс
    if (i % 10 === 0) {
      // Каждые 10 пользователей выводим прогресс
      console.log(`Generated ${i} users...`);
    }
  }
  console.log('About to create users in the database...'); // Перед добавлением пользователей в БД
  await prisma.user.createMany({ data: users });
  console.log('Successfully created users in the database.'); //После успешного добавления пользователей
}

main()
  .catch((error) => {
    console.error('Error during seeding:', error); //Обработка ошибок при заполнении базы
  })
  .finally(async () => {
    console.log('Disconnecting from the database...');// Перед отключением от базы
    await prisma.$disconnect();
    console.log('Disconnected from the database.'); // После отключения от базы
  });

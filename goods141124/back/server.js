import express from 'express'
import 'colors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import productsRoutes from './app/products/products.routes.js'
// import historyRoutes from './app/history/history.routes.ts'
import { prisma } from './app/prisma.js'
// Подключение файла .env для работы с бд.
dotenv.config()

// Запуск самого фреймворка.
const app = express()

async function main() {
	// Eсли разработка будем протоколировать HTTP-запросы.
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	// Мы указали что у нас будет все в формате json.
	app.use(express.json())

	// это у нас будет путь к папке с продуктами.
	app.use('/api/products', productsRoutes)
	// app.use('/api/history', historyRoutes)

	// Прописываем возможные порты или порт по умолчанию
	const PORT = process.env.PORT || 4300
	// Прослушиваем и в терминале выводим рокету
	app.listen(
		PORT,
		console.log(
			`🚀 Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`
				.green.bold
		)
	)
}
main()
	// Если нет ошибок то просто отключаемся от бд.
	.then(async () => {
		// Отключение от бд.
		await prisma.$disconnect()
	})
	// В случае если будет ошибка.
	.catch(async e => {
		// Выводим ошибку в консоль.
		console.log(e)
		// Затем отключаемся от БД.
		await prisma.$disconnect()
		// Команда для завершения процесса.
		// Код 1 указывает на ошибку надо что
		// был код строго 0 тогда будет ок.
		process.exit(1)
	})

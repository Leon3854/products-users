import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Действия журнала по истории товаров
export const logAction = async (
	shopId: number,
	plu: string,
	action: string
) => {
	try {
		// создаем новую акцию с айди товара наименование товара, название акции
		const newAction = await prisma.actionHistory.create({
			data: {
				shopId,
				plu,
				action
			}
		})
		return newAction
		// в случае ошибки выводим текст ошибки 
	} catch (error) {
		console.error('Error logging action:', error)
		throw error
	}
}

// Get history log action by filters.
// Получаем данные по журналу с акциям товаров
export const getActionHistory = async (filters: {
	shopId?: number
	plu?: string
	startData?: Date
	endDate?: Date
	action?: string
	page?: any
	pageSize?: any
}) => {
	// Деструктуризация объекта
	const { shopId, plu, startData, endDate, action, page, pageSize } = filters
	// Создание объекта в котором будет ключ значение если условие будет
	// выполненно положительно
	// иначе будет просо ключ без значения
	const where: any = {
		...(shopId && { shopId }),
		...(plu && { plu }),
		...(startData && { timestamp: { gte: startData } }),
		...(endDate && { timestamp: { lte: endDate } }),
		...(action && { action })
	}
	// Деструктуризация массива - будут соданны две переменных
	// полный счет и история действий
	// Promise.all - Принимаем массив промисов и будет возращен новый промис
	// который будет выполнен тогда когда все промисы в массиве
	// выполнят свои действия.
	const [totalCount, actionHistory] = await Promise.all([
		// метод count взят из prisma как и метода findMany
		// Выполнит подсчет количества записей в табл
		// actionHistory с условиями переданными через объект
		// where.
		prisma.actionHistory.count({ where }),
		// так же будет произведен поиск по данной таблице
		// и найдены все записи по переданному условию через
		// аргумент where
		prisma.actionHistory.findMany({
			// тут заданы условия поиска по табл.
			where,
			// Пропускаем опред количество записей
			// что бу организовать ПОГИНАЦИЮ по стр
			skip: (page - 1) * pageSize,
			// Ограничиваем количество возвращаемых записей до pageSize
			take: pageSize,
			// Вывод записей в данном случае выводиться будут в порядке
			// последней записи не в конец списка а в начало.
			orderBy: { timestamp: 'desc' }
		})
	])
	return {
		// Общее количество записей соответсвующие условиям.
		totalCount,
		// Массив записей соответствующих условиям where,
		// с учетом пагинации и сортировки по времени.
		actionHistory,
		// Количество стр с округление
		totalPages: Math.ceil(totalCount / pageSize),
		// Текущая стр
		currentPage: page
	}
}

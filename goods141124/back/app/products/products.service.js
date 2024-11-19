import { prisma } from '../prisma.js'

// Get all products
export const getAllProducts = async () => {
	return await prisma.product.findMany()
}

// Create new product in our DB
export const createProduct = async (name, plu) => {
	try {
		const newProduct = await prisma.product.create({
			data: {
				name: name,
				plu: plu
			}
		})
		return newProduct
	} catch (error) {
		console.error('Error creating product:', error)
		throw error // Обработка ошибок
	}
}

// Create inventory balance
export const createInventory = async (
	productId,
	shopId,
	quantityOnShelf,
	quantityInOrder
) => {
	try {
		const newInventory = await prisma.inventory.create({
			data: { productId, shopId, quantityOnShelf, quantityInOrder }
		})
		return newInventory
	} catch (error) {
		console.error('Error create inventory:', error)
		throw error
	}
}

// Increase in balance
export const increaseInventory = async (
	inventoryId,
	amountOnShelf,
	amountInOrder
) => {
	try {
		const updateInventory = await prisma.inventory.update({
			where: { id: inventoryId },
			data: {
				quantityOnShelf: { increment: amountOnShelf },
				quantityInOrder: { increment: amountInOrder }
			}
		})
		return updateInventory
	} catch (error) {
		console.log('Error increaseInventory: ', error)
		throw error
	}
}
// Redaction of balance
export const decreaseInventory = async (
	inventoryId,
	amountOnShelf,
	amountInOrder
) => {
	try {
		const updateInventory = await prisma.update({
			where: { id: inventoryId },
			data: {
				quantityOnShelf: { decrement: amountOnShelf },
				quantityInOrder: { decrement: amountInOrder }
			}
		})
		return updateInventory
	} catch (error) {
		console.log('Error decreaseInventory: ', error)
		throw error
	}
}

// Getting residues by filters
export const getInventories = async filters => {
	const { plu, shopId, quantityOnShelfRange, quantityInOrderRange } = filters
	const where = {
		// Если plu не null и undefined а имеет значение то тогда
		// буде создан объект product: plu
		// Если будет false  то значение plu выйет путсым
		// И через оператор спред мы все добавим в род объект
		...(plu && { product: { plu } }),
		...(shopId && { shopId }),
		...(quantityOnShelfRange && {
			quantityOnShelf: {
				gte: quantityOnShelfRange.from,
				lte: quantityOnShelfRange.to
			}
		}),
		...(quantityInOrderRange && {
			quantityInOrder: {
				gte: quantityInOrderRange.from,
				lte: quantityInOrderRange.to
			}
		})
	}
	return await prisma.inventory.findMany({
		where,
		// Вклчаем связанные данные
		include: { product: true, shop: true }
	})
}

// Getting products by filters
export const getProductFilters = async filters => {
	// Деструктурируем объект и извлекаем свойсвта из объекта filters
	const { name, plu } = filters
	const where = {
		// Если есть имя то создаем объект со значением имени
		// иначе пустой просто выводим ключ без значения
		...(name && { name: { contains: name, mode: 'insensitive' } }),
		// Если есть plu создаем объект иначе выводим только ключ без значения
		...(plu && { plu })
	}
	return await prisma.product.findMany({ where })
}

import { response } from 'express'
import {
	createInventory,
	createProduct,
	getAllProducts,
	increaseInventory,
	decreaseInventory,
	getInventories,
	getProductFilters
} from './products.service.js'

// Controller get all products.
export const getAllProductsController = async (req, res) => {
	try {
		const products = await getAllProducts()
		res.status(200).json(products)
	} catch (error) {
		// status 500 - Internal Server Error
		res.status(500).json({ error: 'Error fetching product' })
	}
}

// Controller create new the product.
export const createProductController = async (req, res) => {
	// Данные передаются в тело запроса.
	const { name, plu } = req.body

	try {
		const newProduct = await createProduct(name, plu)
		res.status(201).json(newProduct)
	} catch (error) {
		res.status(500).json({ error: 'Error creating product' })
	}
}

// Controller create inventory
export const createInventoryController = async (req, res) => {
	const { productId, shopId, quantityOnShelf, quantityInOrder } = req.body
	try {
		const newInventory = await createInventory(
			productId,
			shopId,
			quantityOnShelf,
			quantityInOrder
		)
		res.status(200).json(newInventory)
	} catch (error) {
		res.status(500).json({ error: 'Error create inventory' })
	}
}

// Controller for increase inventory
export const increaseInventoryController = async (req, res) => {
	// Деструктруируем объек и извлекаем свойства из объекта и
	// при каждом обращинии мы менуем запрос req.body.inventoryId
	// на прямую записываем inventoryId
	const { inventoryId, amountOnShelf, amountInOrder } = req.body
	// Обезапасим себя на тот случай если произойдет ошибка
	try {
		const updatedInventory = await increaseInventory(
			inventoryId,
			amountOnShelf,
			amountInOrder
		)
		res.status(200).json(updatedInventory)
	} catch (error) {
		res.status(500).json({ error: 'Error increasing inventory' })
	}
}

// Controller for decrease inventory
export const decreaseInventoryController = async (req, res) => {
	const { inventoryId, amountOnShelf, amountInOrder } = req.body
	try {
		const updateInventory = await decreaseInventory(
			inventoryId,
			amountOnShelf,
			amountInOrder
		)
		res.status(200).json(updateInventory)
	} catch (error) {
		res.status(500).json({ error: 'Error increasing inventory' })
	}
}

// Controller getting inventories by filters
export const getInventoriesController = async (req, res) => {
	// getting filters from query
	const filters = req.body
	try {
		const inventories = await getInventories(filters)
		res.status(200).json(inventories)
	} catch (error) {
		res.status(500).json({ error: 'Error fetching inventories' })
	}
}

// controller getting products by filters
export const getProductsController = async (req, res) => {
	const filters = req.query
	try {
		const products = await getProductFilters(filters)
		res.status(200).json(products)
	} catch (error) {
		res.status(500).json({ error: 'Error fetching products' })
	}
}

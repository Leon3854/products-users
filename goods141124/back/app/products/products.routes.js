import express from 'express'
import {
	createInventoryController,
	createProductController,
	decreaseInventoryController,
	getAllProductsController,
	getInventoriesController,
	getProductsController,
	increaseInventoryController
} from './products.controller.js'

const router = express.Router()

// Route for get all products.
router.get('/products', getAllProductsController)
// Route for create new the product.
router.post('/products', createProductController)
// Route create inventory
router.post('/inventories', createInventoryController)
// Route increase inventory
router.patch('/inventories/increase', increaseInventoryController)
// Route decrease inventory
router.patch('/inventories/decrease', decreaseInventoryController)
// Route inventories by filters
router.get('/inventories', getInventoriesController)
// Route products by filters
router.get('/products', getProductsController)

export default router

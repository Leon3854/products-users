import express from 'express'
import {
	getActionHistoryController,
	logActionController
} from './history.controller'

const router = express.Router()

router.post('/actions', logActionController)
router.get('/actions', getActionHistoryController)

export default router

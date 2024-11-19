import { Request, Response } from 'express'
import { getActionHistory, logAction } from './history.service'

export const logActionController = async (req: Request, res: Response) => {
	const { shopId, plu, action } = req.body
	try {
		const newAction = await logAction(shopId, plu, action)
		res.status(201).json(newAction)
	} catch (error) {
		res.status(500).json({ error: 'Error logging action' })
	}
}

export const getActionHistoryController = async (
	req: Request,
	res: Response
) => {
	const filters = {
		shopId: parseInt(req.query.shopId as string),
		plu: req.query.plu as string,
		startDate: req.query.startDate
			? new Date(req.query.startDate as string)
			: undefined,
		endDate: req.query.endDate
			? new Date(req.query.endDate as string)
			: undefined,
		action: req.query.action as string,
		page: parseInt(req.query.page as string),
		pageSize: parseInt(req.query.pageSize as string)
	}

	try {
		const history = await getActionHistory(filters)
		res.status(200).json(history)
	} catch (error) {
		res.status(500).json({ error: 'Error fetching action history' })
	}
}

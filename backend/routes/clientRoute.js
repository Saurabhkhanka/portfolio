import express from 'express'
import { clientController, clientInfoController, deleteClientInfoController, clearAllClientInfoController } from '../controllers/clientController.js'


const router = express.Router()

router.post('/client', clientController)
router.get('/clintInfo', clientInfoController)
router.delete('/clintInfo/:id', deleteClientInfoController)
router.delete('/clintInfo', clearAllClientInfoController)

export default router
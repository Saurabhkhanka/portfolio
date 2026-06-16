import express from 'express'
import { clientController, clientInfoController, deleteClientInfoController, clearAllClientInfoController } from '../controllers/clientController.js'
import { requireSignIn, isAdmin } from '../middleware/authMiddleware.js'


const router = express.Router()

router.post('/client', requireSignIn, clientController)
router.get('/clintInfo', requireSignIn, isAdmin, clientInfoController)
router.delete('/clintInfo/:id', requireSignIn, isAdmin, deleteClientInfoController)
router.delete('/clintInfo', requireSignIn, isAdmin, clearAllClientInfoController)

export default router
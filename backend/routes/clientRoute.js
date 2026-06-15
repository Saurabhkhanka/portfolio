import express from 'express'
import { clientController, clientInfoController} from '../controllers/clientController.js'
import { requireSignIn, isAdmin } from '../middleware/authMiddleware.js'


const router = express.Router()

router.post('/client', requireSignIn, clientController)
router.get('/clintInfo', requireSignIn, isAdmin, clientInfoController)

export default router
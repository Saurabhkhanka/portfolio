import express from 'express'
import { clientController, clientInfoController} from '../controllers/clientController.js'


const router = express.Router()

router.post('/client', clientController)
router.get('/clintInfo', clientInfoController)

export default router
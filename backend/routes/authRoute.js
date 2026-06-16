import express from "express";
import { 
    getActivityLogsController, 
    getUsersController,
    deleteActivityLogController,
    clearAllActivityLogsController
} from "../controllers/authController.js";

const router = express.Router();

router.get("/activity-logs", getActivityLogsController);
router.delete("/activity-logs/:id", deleteActivityLogController);
router.delete("/activity-logs", clearAllActivityLogsController);
router.get("/users", getUsersController);

export default router;

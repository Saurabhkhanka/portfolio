import express from "express";
import { 
    registerController, 
    verifyRegisterController, 
    loginController, 
    logoutController, 
    getMeController, 
    getActivityLogsController, 
    getUsersController,
    uploadResumeController,
    downloadResumeController
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/verify-register", verifyRegisterController);
router.post("/login", loginController);
router.post("/logout", requireSignIn, logoutController);
router.get("/me", requireSignIn, getMeController);
router.get("/activity-logs", requireSignIn, isAdmin, getActivityLogsController);
router.get("/users", requireSignIn, isAdmin, getUsersController);
router.post("/resume/upload", requireSignIn, isAdmin, uploadResumeController);
router.get("/resume/download", downloadResumeController);

export default router;

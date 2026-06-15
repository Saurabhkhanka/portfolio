import express from "express";
import { registerController, verifyRegisterController, loginController, logoutController, getMeController, getActivityLogsController, getUsersController } from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/verify-register", verifyRegisterController);
router.post("/login", loginController);
router.post("/logout", requireSignIn, logoutController);
router.get("/me", requireSignIn, getMeController);
router.get("/activity-logs", requireSignIn, isAdmin, getActivityLogsController);
router.get("/users", requireSignIn, isAdmin, getUsersController);

export default router;

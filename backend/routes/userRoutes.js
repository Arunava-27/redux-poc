import express from "express";
import {
  authUser,
  logoutUser,
  updateUserProfile,
  registerUser,
  getUserProfile,
  googleLoginOrRegister,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/google", googleLoginOrRegister);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;

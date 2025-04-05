import express from "express";
import {
  handleRegister,
  handleGetUsers,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
  handleLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/register", handleGetUsers);
router.get("/register/:id", handleGetUserById);
router.put("/register/:id", handleUpdateUser);
router.delete("/register/:id", handleDeleteUser);

export default router;

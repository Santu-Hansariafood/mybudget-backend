import express from "express";
import {
  createBudget,
  getUserBudgets,
  getSingleBudget,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createBudget).get(protect, getUserBudgets);

router
  .route("/:id")
  .get(protect, getSingleBudget)
  .put(protect, updateBudget)
  .delete(protect, deleteBudget);

export default router;

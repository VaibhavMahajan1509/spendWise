import express from "express";
import {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} from "../controllers/expenseController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// better REST API structure
router.post("/", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpenses);
router.delete("/:id", authMiddleware, deleteExpense);
router.put("/:id", authMiddleware, updateExpense);

export default router;
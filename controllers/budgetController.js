import * as budgetService from "../services/budgetService.js";

export const createBudget = async (req, res) => {
  try {
    const budget = await budgetService.createBudget(req.user._id, req.body);
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserBudgets = async (req, res) => {
  try {
    const budgets = await budgetService.getBudgetsByUser(req.user._id);
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSingleBudget = async (req, res) => {
  try {
    const budget = await budgetService.getBudgetById(
      req.params.id,
      req.user._id
    );
    if (!budget) return res.status(404).json({ message: "Budget not found" });
    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const updated = await budgetService.updateBudget(
      req.params.id,
      req.user._id,
      req.body
    );
    if (!updated)
      return res
        .status(404)
        .json({ message: "Budget not found or not authorized" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const deleted = await budgetService.deleteBudget(
      req.params.id,
      req.user._id
    );
    if (!deleted)
      return res
        .status(404)
        .json({ message: "Budget not found or not authorized" });
    res.json({ message: "Budget deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

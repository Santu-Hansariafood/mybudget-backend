import Budget from "../models/Budget.js";

export const createBudget = async (userId, data) => {
  const newBudget = new Budget({ ...data, user: userId });
  return await newBudget.save();
};

export const getBudgetsByUser = async (userId) => {
  return await Budget.find({ user: userId });
};

export const getBudgetById = async (budgetId, userId) => {
  return await Budget.findOne({ _id: budgetId, user: userId });
};

export const updateBudget = async (budgetId, userId, data) => {
  return await Budget.findOneAndUpdate({ _id: budgetId, user: userId }, data, {
    new: true,
  });
};

export const deleteBudget = async (budgetId, userId) => {
  return await Budget.findOneAndDelete({ _id: budgetId, user: userId });
};

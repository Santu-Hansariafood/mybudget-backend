import * as transactionService from "../services/transactionService.js";

export const createTransaction = async (req, res) => {
  try {
    const data = { ...req.body, username: req.user.username };
    const newTransaction = await transactionService.createTransaction(data);
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Create Transaction Error:", error);
    res.status(500).json({ message: "Failed to create transaction" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions(
      req.user.username
    );
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Get Transactions Error:", error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.getTransactionById(
      req.params.id,
      req.user.username
    );
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json(transaction);
  } catch (error) {
    console.error("Get Transaction Error:", error);
    res.status(500).json({ message: "Failed to fetch transaction" });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const updated = await transactionService.updateTransaction(
      req.params.id,
      req.body,
      req.user.username
    );
    if (!updated)
      return res
        .status(404)
        .json({ message: "Transaction not found or unauthorized" });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Transaction Error:", error);
    res.status(500).json({ message: "Failed to update transaction" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const deleted = await transactionService.deleteTransaction(
      req.params.id,
      req.user.username
    );
    if (!deleted)
      return res
        .status(404)
        .json({ message: "Transaction not found or unauthorized" });
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Delete Transaction Error:", error);
    res.status(500).json({ message: "Failed to delete transaction" });
  }
};

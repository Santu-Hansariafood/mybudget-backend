import Transaction from "../models/Transaction.js";

export const createTransaction = async (data) => {
  const newTransaction = new Transaction(data);
  return await newTransaction.save();
};

export const getAllTransactions = async (username) => {
  return await Transaction.find({ username }).sort({ date: -1 });
};

export const getTransactionById = async (id, username) => {
  return await Transaction.findOne({ _id: id, username });
};

export const updateTransaction = async (id, data, username) => {
  return await Transaction.findOneAndUpdate({ _id: id, username }, data, {
    new: true,
  });
};

export const deleteTransaction = async (id, username) => {
  return await Transaction.findOneAndDelete({ _id: id, username });
};

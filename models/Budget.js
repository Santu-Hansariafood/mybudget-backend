import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    totalBudget: {
      type: Number,
      required: true,
    },
    categories: [
      {
        label: String,
        value: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;

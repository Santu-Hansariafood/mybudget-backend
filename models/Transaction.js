import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    notes: { type: String, default: "" },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);

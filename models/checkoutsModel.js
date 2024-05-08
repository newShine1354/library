import mongoose from "mongoose";

const { Schema, model } = mongoose;

const checkoutSchema = new Schema(
  {
    user_id: { type: String, required: true, ref: "user" },
    book_id: { type: String, required: true, ref: "book" },
    checkout_date: { type: String, required: true },
    return_date: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Checkout = new model("checkout", checkoutSchema);

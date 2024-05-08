import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: Number,
      required: true,
      unique: true,
    },
    published_at: {
      type: String,
      required: true,
    },
    copies: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = new model("book", bookSchema);

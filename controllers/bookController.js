import { Book } from "../models/bookModel.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;
const addBook = async (req, res) => {
  try {
    const { title, author, isbn, published_at, copies } = req.body;
    if ([title, author, isbn, published_at, copies].some((item) => !item)) {
      res.status(400).send({ message: "Enter all detials" });
    }
    const book = await Book.create({
      title,
      author,
      isbn,
      published_at,
      copies,
    });
    res
      .status(201)
      .send({ message: "Book added Successfully", book, success: true });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error while adding book",
      success: false,
    });
  }
};

const getBooks = async (_, res) => {
  try {
    const books = await Book.find();
    res
      .status(200)
      .send({ message: "Data fetched Successfully.", books, success: true });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error while fetching all books",
      success: false,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, published_at, copies } = req.body;

    const updatedBook = await Book.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { title, author, isbn, published_at, copies },
      { new: true }
    );
    res.status(200).send({
      message: "Book updated successfully.",
      updatedBook,
      uccess: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error while updating book",
      success: false,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findOneAndDelete({ _id: new ObjectId(id) });
    res
      .status(200)
      .send({
        message: "Book deleted Successfully",
        success: false,
        deletedBook,
      });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error while removing book",
      success: false,
    });
  }
};

export { getBooks, addBook, updateBook, deleteBook };

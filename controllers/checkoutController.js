import mongoose from "mongoose";
import { Book } from "../models/bookModel.js";
import { Checkout } from "../models/checkoutsModel.js";

const { ObjectId } = mongoose.Types;
const createCheckout = async (req, res) => {
  try {
    const { user_id, book_id, checkout_date } = req.body;
    if ([user_id, book_id, checkout_date].some((item) => !item)) {
      return res.status(400);
    }
    const book = await Book.findById(book_id);
    if (book.copies < 1) {
      return res
        .status(400)
        .send({ message: "Out of stock!!!", success: false });
    }
    const checkCheckout = await Checkout.aggregate([
      {
        $match: {
          book_id,
          user_id,
        },
      },
    ]);
    if (checkCheckout) {
        return res.status(400).send({message: "You already have this book."})
    }
    const checkout = await Checkout.create({
      user_id,
      book_id,
      checkout_date,
    });
    const updatedBook = await Book.findOneAndUpdate(
      {
        _id: new ObjectId(book_id),
      },
      { copies: book.copies - 1 }
    );
    res.status(201).send({
      message: "Checkout create successfully.",
      checkout,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error while creating checkout",
      success: false,
    });
  }
};

const returnBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { return_date } = req.body;

    if (!return_date) {
      res.status(400).send({ message: "return date!", success: false });
    }
    const updatedCheckout = await Checkout.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        return_date,
      },
      { new: true }
    );
    if (!updatedCheckout) {
      res.status(404).send({ message: "This is not our book", success: false });
    }
    const book = await Book.findById(updatedCheckout.book_id);
    const returnedBook = await Book.findOneAndUpdate(
      {
        _id: new ObjectId(book._id),
      },
      { copies: book.copies + 1 }
    );
    res
      .status(200)
      .send({ message: "Book is returned", success: true, updatedCheckout });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error while creating checkout",
      success: false,
    });
  }
};

export { createCheckout, returnBook };

import mongoose, { model, Schema, Document } from "mongoose";

export default interface Books extends Document {
  _id: string;
  bookName: string;
  description: string;
  numberOfPages: number;
  authorName: string;
  publisherName: string;
  isDeleted: boolean;
}

const BooksSchema = new Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    numberOfPages: {
      type: Number,
    },
    authorName: {
      type: String,
    },
    publisherName: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const BooksModel = model<Books>("Books", BooksSchema);

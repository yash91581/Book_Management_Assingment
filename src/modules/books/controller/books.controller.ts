import { sendResponse } from "../../../commonUtils/sendResponse";
import { Request, Response } from "express";
import logger from "../../..//commonUtils/winstonLogger";
import booksServices from "../services/books.services.base";

const booksController = {
  create: async (req: Request, res: Response) => {
    try {
      const bookData = req.body;
      if (!bookData.bookName) {
        return sendResponse(res, 400, false, null, "Book Name Is Required");
      }
      if (typeof bookData.numberOfPages != "number") {
        return sendResponse(
          res,
          400,
          false,
          null,
          "Book Page Number Should Be A Number"
        );
      }
      const createBook = await booksServices.create(bookData);
      if (!createBook.success) {
        return sendResponse(res, 500, false, null, createBook.message);
      }
      return sendResponse(
        res,
        200,
        true,
        createBook.data,
        "Book Created Successfully"
      );
    } catch (booksControllerError) {
      logger.error("booksController :: create ::", booksControllerError);
      return sendResponse(res, 500, false, null, "Internal Server Error");
    }
  },

  findOne: async (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      if (!bookId) {
        return sendResponse(res, 400, false, null, "Book Id Is Required");
      }
      const getBookById = await booksServices.findOne({ _id: bookId });
      if (!getBookById.success) {
        return sendResponse(res, 400, false, null, getBookById.message);
      }
      return sendResponse(res, 200, true, getBookById.data, "");
    } catch (booksControllerError) {
      logger.error("booksController :: findOne ::", booksControllerError);
      return sendResponse(res, 500, false, null, "Internal Server Error");
    }
  },

  findAll: async (req: Request, res: Response) => {
    try {
      const { bookName, authorName, publisherName } = req.query;
      let filter: any = {};
      if (bookName) {
        filter["bookName"] = new RegExp(bookName as string, "i");
      }
      if (authorName) {
        filter["authorName"] = new RegExp(authorName as string, "i");
      }
      if (publisherName) {
        filter["publisherName"] = new RegExp(publisherName as string, "i");
      }
      const getAllBooks = await booksServices.findAll(filter);
      if (!getAllBooks.success) {
        return sendResponse(res, 400, false, null, getAllBooks.message);
      }
      if (Array.isArray(getAllBooks.data) && getAllBooks.data.length === 0) {
        return sendResponse(res, 200, true, getAllBooks.data, "Book Not Found");
      }
      return sendResponse(res, 200, true, getAllBooks.data, "");
    } catch (booksControllerError) {
      logger.error("booksController :: findAll ::", booksControllerError);
      return sendResponse(res, 500, false, null, "Internal Server Error");
    }
  },

  deleteOne: async (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      if (!bookId) {
        return sendResponse(res, 400, false, null, "Book Id Is Required");
      }
      const deleteBookById = await booksServices.deleteOne({ _id: bookId });
      if (!deleteBookById.success) {
        return sendResponse(res, 400, false, null, deleteBookById.message);
      }
      return sendResponse(
        res,
        200,
        true,
        deleteBookById.data,
        "Book Deleted Successfully"
      );
    } catch (booksControllerError) {
      logger.error("booksController :: deleteOne ::", booksControllerError);
      return sendResponse(res, 500, false, null, "Internal Server Error");
    }
  },

  updateOne: async (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      console.log(req.params);
      const bookData = req.body;
      if (!bookId) {
        return sendResponse(res, 400, false, null, "Book Id Is Required");
      }
      if (bookData && bookData.bookName === "") {
        return sendResponse(res, 400, false, null, "Book Name Is Required");
      }
      if (bookData && typeof bookData.numberOfPages != "number") {
        return sendResponse(
          res,
          400,
          false,
          null,
          "Book Page Number Should Be A Number"
        );
      }
      const updateBook = await booksServices.update({ _id: bookId }, bookData);
      if (!updateBook.success) {
        return sendResponse(res, 400, false, null, updateBook.message);
      }
      return sendResponse(
        res,
        200,
        true,
        updateBook.data,
        "Book Updated Successfully"
      );
    } catch (booksControllerError) {
      logger.error("booksController :: updateOne ::", booksControllerError);
      return sendResponse(res, 500, false, null, "Internal Server Error");
    }
  },
};
export default booksController;

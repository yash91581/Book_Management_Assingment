import { sendServiceResult } from "../../../commonUtils/sendResponse";
import logger from "../../../commonUtils/winstonLogger";
import { BooksModel } from "../model/books.model";

const booksServices = {
  create: async (data: any) => {
    try {
      const createData = await BooksModel.create(data);
      return sendServiceResult(200, true, createData, "");
    } catch (booksServiceError: any) {
      logger.error("booksServiceError :: create :: ", booksServiceError);
      return sendServiceResult(400, false, null, booksServiceError.message);
    }
  },

  findOne: async (
    condition: any,
    projectionString = "",
    populatedArray: any[] = []
  ) => {
    try {
      const findOneResult = await BooksModel.findOne(
        condition,
        projectionString
      ).populate(populatedArray);
      return sendServiceResult(200, true, findOneResult, "");
    } catch (booksServiceError: any) {
      logger.error("booksServiceError :: findOne :: ", booksServiceError);
      return sendServiceResult(400, false, null, booksServiceError.message);
    }
  },

  findAll: async (
    condition: any,
    projectionString = "",
    populatedArray: any[] = []
  ) => {
    try {
      const findAllResult = await BooksModel.find(
        condition,
        projectionString
      ).populate(populatedArray);
      return sendServiceResult(200, true, findAllResult, "");
    } catch (booksServiceError: any) {
      return sendServiceResult(400, false, null, booksServiceError.message);
    }
  },

  deleteOne: async (condition: any) => {
    try {
      const deleteOneResult = await BooksModel.findOneAndDelete(condition);
      return sendServiceResult(200, true, deleteOneResult, "");
    } catch (booksServiceError: any) {
      logger.error("booksServiceError :: deleteOne :: ", booksServiceError);
      return sendServiceResult(400, false, null, booksServiceError.message);
    }
  },

  update: async (condition: any, updatedData: any) => {
    try {
      const updateResult = await BooksModel.findOneAndUpdate(
        condition,
        { $set: updatedData },
        { new: true }
      );
      return sendServiceResult(200, true, updateResult, "");
    } catch (booksServiceError: any) {
      logger.error("booksServiceError :: update :: ", booksServiceError);
      return sendServiceResult(400, false, null, booksServiceError.message);
    }
  },
};
export default booksServices;

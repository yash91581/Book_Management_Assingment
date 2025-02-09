import express from "express";
import addRoute from "../../../helpers/routeHandler";
import { IBaseRouterElement } from "../../../routes/routeInterface";
import booksController from "../controller/books.controller";

const booksRouter = express.Router();

const booksRoutes: IBaseRouterElement[] = [
  {
    method: ["post"],
    path: "/",
    pathCallback: booksController.create,
  },
  {
    method: ["get"],
    path: "/:id",
    pathCallback: booksController.findOne,
  },
  {
    method: ["get"],
    path: "/",
    pathCallback: booksController.findAll,
  },
  {
    method: ["put"],
    path: "/:id",
    pathCallback: booksController.updateOne,
  },
  {
    method: ["delete"],
    path: "/:id",
    pathCallback: booksController.deleteOne,
  },
];

for (const routeItem of booksRoutes) {
  for (const methodItem of routeItem.method) {
    addRoute(booksRouter, methodItem, routeItem.path, routeItem.pathCallback);
  }
}

export default booksRouter;
export const routeTable = booksRoutes;

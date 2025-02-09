import express from "express";
import addRoute from "../../../helpers/routeHandler";
import { IBaseRouterElement } from "../../../routes/routeInterface";
import jwtAPiController from "../controller/jwtApi.controller";

const jwtPreRouter = express.Router();

const jwtPreRoutes: IBaseRouterElement[] = [
  {
    method: ["post"],
    path: "/",
    pathCallback: jwtAPiController.generateJwtToken,
  }
];

for (const routeItem of jwtPreRoutes) {
  for (const methodItem of routeItem.method) {
    addRoute(jwtPreRouter, methodItem, routeItem.path, routeItem.pathCallback);
  }
}

export default jwtPreRouter;
export const routeTable = jwtPreRoutes;

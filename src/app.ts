import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { API_CONFIG } from "./config/config";
import "./database";
import routes from "./routes";
import { JwtMiddleWare } from "./middlewares/JWTMiddleware/jwtMiddleware";

const app = express();

app.use(helmet());

app.use(compression());

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.use(bodyParser.json({ limit: "10mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(morgan("combined"));

app.use(`${API_CONFIG.BASE_ENDPOINT}/${API_CONFIG.API_VERSION}`, routes.preRoute);

app.use(JwtMiddleWare())

app.use(`${API_CONFIG.BASE_ENDPOINT}/${API_CONFIG.API_VERSION}`, routes.route);

export default app;

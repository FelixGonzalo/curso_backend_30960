import { Router } from "../../deps.ts";
import {
  createColor,
  findColor,
  pageColor,
} from "../controllers/colorController.ts";

export const router = new Router()
  .get("/api/colors", findColor)
  .post("/api/colors", createColor)
  .get("/", pageColor);

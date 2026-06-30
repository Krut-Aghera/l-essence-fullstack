import express from "express";
import { fetchFilterMetadata } from "../controllers/perfume.controller.js";

const perfumeRouter = express.Router();

perfumeRouter.get("/filter-meta", fetchFilterMetadata);

export default perfumeRouter;

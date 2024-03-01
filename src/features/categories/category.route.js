import express from "express";

import { addCategoryController } from "./category.controller.js";

const router = express.Router();

router.post("/add", addCategoryController);

export default router;

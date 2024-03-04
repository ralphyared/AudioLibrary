import express from "express";

import { isAuthenticated } from "../user/auth.middleware.js";
import { addCategory } from "./category.controller.js";
import { validate } from "../../global/utils.js";
import { addCategorySchema } from "./category.validation.js";

const router = express.Router();

router.post("/add", isAuthenticated, validate(addCategorySchema), addCategory);

export default router;

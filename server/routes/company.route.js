import express from "express";
import isAuthenticated from "../middlewares/authentication.js";
import { singleUpload } from "../middlewares/multer.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";

const router = express.Router();

router.use(isAuthenticated);

router
  .post("/register", registerCompany)
  .get("/get", getCompany)
  .get("/get/:id", getCompanyById)
  .put("/update/:id", singleUpload, updateCompany);

export default router;

import express from "express";
import isAuthenticated from "../middlewares/authentication.js";
import {
  postJob,
  getAllJobs,
  getAdminJobs,
  getJobById,
} from "../controllers/job.controller.js";

const router = express.Router();

router.use(isAuthenticated);

router
  .post("/post", postJob)
  .get("/get", getAllJobs)
  .get("/getadminjobs", getAdminJobs)
  .get("/get/:id", getJobById);

export default router;

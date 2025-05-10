import express from "express";
import isAuthenticated from "../middlewares/authentication.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.use(isAuthenticated);

router
  .get("/apply/:id", applyJob)
  .get("/get", getAppliedJobs)
  .get("/:id/applicants", getApplicants) 
  .post("/status/:id/update", updateStatus);

export default router;

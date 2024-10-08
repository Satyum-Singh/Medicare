import express from "express";
import {
  getAllReviews,
  createReview,
} from "../Controllers/reviewController.js";
import { authenticate, restrict } from "./../auth/verifyToken.js";

const router = express.Router({ mergeParams: true }); // mergeParams is used for accessing doctorsId from parameters from parent route

router.get("/", getAllReviews);
router.post("/", authenticate, restrict(["patient"]), createReview);

export default router;

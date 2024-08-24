import {
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  updateDoctor,
} from "../Controllers/doctorController.js";
import express from "express";

import { authenticate,restrict } from '../auth/verifyToken.js';
import reviewRouter from './review.js'

const router = express.Router();

// nested route
router.use('/:doctorId/reviews',reviewRouter);

// This is a dnamic route for getting a user by id
router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.put("/:id", authenticate, restrict(["doctor"]),updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]),deleteDoctor);

export default router;

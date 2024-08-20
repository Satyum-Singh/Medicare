import {
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  updateDoctor,
} from "../Controllers/doctorController.js";
import express from "express";

const router = express.Router();

// This is a dnamic route for getting a user by id
router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;

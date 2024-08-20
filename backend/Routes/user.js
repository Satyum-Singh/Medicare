import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../Controllers/userController.js";
import express from "express";

const router = express.Router();

// This is a dnamic route for getting a user by id
router.get("/:id", getSingleUser);
router.get("/", getAllUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

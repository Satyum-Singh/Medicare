import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
  getUserProfile,
  getMyAppointments
} from "../Controllers/userController.js";
import express from "express";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// This is a dnamic route for getting a user by id
router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);
router.get("/", authenticate, restrict(["admin"]), getAllUser);
router.put("/:id", authenticate, restrict(["patient"]), updateUser);
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);
router.delete("/appointments/my-appointments", authenticate, restrict(["patient"]), getMyAppointments);

export default router;

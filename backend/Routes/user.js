import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../Controllers/userController.js";
import express from "express";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// This is a dnamic route for getting a user by id
router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);
router.get("/", authenticate, restrict(["admin"]), getAllUser);
router.put("/:id", authenticate, restrict(["patient"]), updateUser);
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);

export default router;

import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/userController"

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", authenticateToken, getUserById);
router.put("/users/:id", authenticateToken, updateUser);
router.delete("/users/:id", authenticateToken, deleteUser);

export default router;
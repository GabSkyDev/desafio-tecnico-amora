import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import {
    createPropertyList,
    getUserPropertyLists,
    getPropertyListById,
    updatePropertyListById,
    deletePropertyList
} from "../controllers/propertyListController"

const router = Router();

router.post("/users/:userId/property-lists", createPropertyList);
router.get("/users/:userId/property-lists", getUserPropertyLists);
router.get("/users/:userId/property-lists/:listId", authenticateToken, getPropertyListById);
router.put("/users/:userId/property-lists/:listId", authenticateToken, updatePropertyListById);
router.delete("/users/:userId/property-lists/:listId", authenticateToken, deletePropertyList);

export default router;
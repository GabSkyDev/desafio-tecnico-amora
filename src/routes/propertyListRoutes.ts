import { Router } from "express";
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
router.get("/users/:userId/property-lists/:listId", getPropertyListById);
router.put("/users/:userId/property-lists/:listId", updatePropertyListById);
router.delete("/users/:userId/property-lists/:listId", deletePropertyList);

export default router;
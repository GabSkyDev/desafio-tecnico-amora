import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import {
    createProperty,
    getPropertiesFromList,
    getPropertyFromList,
    updatePropertyById,
    deletePropertyFromList
} from "../controllers/propertiesController";

const router = Router();

router.post("/users/:userId/property-lists/:listId/properties", authenticateToken, createProperty);
router.get("/users/:userId/property-lists/:listId/properties", authenticateToken, getPropertiesFromList);
router.get("/users/:userId/property-lists/:listId/properties/:propId", authenticateToken, getPropertyFromList);
router.put("/users/:userId/property-lists/:listId/properties/:propId", authenticateToken, updatePropertyById);
router.delete("/users/:userId/property-lists/:listId/properties/:propId", authenticateToken, deletePropertyFromList);

export default router;
import { Router } from "express";
import {
    createProperty,
    getPropertiesFromList,
    getPropertyFromList,
    updatePropertyById,
    deletePropertyFromList
} from "../controllers/propertiesController";

const router = Router();

router.post("/users/:userId/property-lists/:listId/properties", createProperty);
router.get("/users/:userId/property-lists/:listId/properties", getPropertiesFromList);
router.get("/users/:userId/property-lists/:listId/properties/:propId", getPropertyFromList);
router.put("/users/:userId/property-lists/:listId/properties/:propId", updatePropertyById);
router.delete("/users/:userId/property-lists/:listId/properties/:propId", deletePropertyFromList);

export default router;
import { Request, Response } from "express";
import { AppDataSource } from "../repository/data-source";
import { Properties } from "../models/Properties";
import { PropertyList } from "../models/PropertyList";
import { Users } from "../models/Users";

const propertiesRepository = AppDataSource.getRepository(Properties);
const propListRepository = AppDataSource.getRepository(PropertyList);
const userRepository = AppDataSource.getRepository(Users);

export const createProperty = async (req: Request<{ userId: string, listId: string}>, res: Response) => {
    const { userId, listId } = req.params;
    const { title, price, adress, url, createdAt, comments } = req.body;

    if (!userId || !listId) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    try {
        const propList = await propListRepository.findOne({
            where: { id: listId },
            relations: ["user"]
        });
        
        if (!propList){
            return res.status(404).json({ message: "Property not found" })
        }

        if (propList.user.id !== userId) {
            return res.status(403).json({ message: "This user does not own this property list" });
        }

        const newProperty = propertiesRepository.create({
            title,
            price,
            adress,
            url,
            createdAt,
            comments,
            propertyList: propList
        });

        await propertiesRepository.save(newProperty);

        return res.status(201).json(newProperty);
    } catch (error){
        console.log("Error creating property: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getPropertiesFromList = async (req: Request<{ userId: string, listId: string}>, res: Response) => {
    const { userId, listId } = req.params;

    if (!userId || !listId) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    try {
        const propList = await propListRepository.findOne({
            where: { id: listId },
            relations: ["properties", "user"]
        });

        if (!propList) {
            return res.status(404).json({ message: "Property list not found" });
        }

        if (propList.user.id !== userId){
            return res.status(404).json({ message: "This user does not own this property list" });            
        }
        
        return res.status(200).json(propList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getPropertyFromList = async (req: Request<{ userId: string, listId: string, propId: string }>, res: Response) => {
    const { userId, listId, propId } = req.params;

    if (!userId || !listId || !propId) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    try {
        const propList = await propListRepository.findOne({
            where: { id: listId },
            relations: ["properties", "user"]
        });

        if (!propList) {
            return res.status(404).json({ message: "Property list not found" });
        }

        if (propList.user.id !== userId) {
            return res.status(403).json({ message: "This user does not own this property" });
        }

        const property = propList.properties.find((prop: Properties) => prop.id === propId);

        if (!property) {
            return res.status(404).json({ message: "Property not found in this list" });
        }

        return res.status(200).json(property);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updatePropertyById = async (req: Request<{ userId: string, listId: string, propId: string }>, res: Response) => {
    const { userId, listId, propId } = req.params;

    if (!userId || !listId || !propId) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    try {
        const propList = await propListRepository.findOne({
            where: { id: listId },
            relations: ["properties", "user"]
        });

        if (!propList) {
            return res.status(404).json({ message: "Property list not found" });
        }

        if (propList.user.id !== userId) {
            return res.status(403).json({ message: "This user does not own this property" });
        }

        const property = propList.properties.find((prop: Properties) => prop.id === propId);

        if (!property) {
            return res.status(404).json({ message: "Property not found in this list" });
        }

        const { title, price, adress, url, createdAt, comments } = req.body;
        if (title !== undefined) property.title = title;
        if (price !== undefined) property.price = price;
        if (adress !== undefined) property.adress = adress;
        if (url !== undefined) property.url = url;
        if (createdAt !== undefined) property.createdAt = new Date(createdAt);
        if (comments !== undefined) property.comments = comments;

        const result = await propertiesRepository.save(property);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deletePropertyFromList  = async (req: Request<{ userId: string, listId: string, propId: string }>, res: Response) => {
    const { userId, listId, propId } = req.params;

    if (!userId || !listId || !propId) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    try {
        const propList = await propListRepository.findOne({
            where: { id: listId },
            relations: ["properties", "user"]
        });

        if (!propList) {
            return res.status(404).json({ message: "Property list not found" });
        }

        if (propList.user.id !== userId) {
            return res.status(403).json({ message: "This user does not own this property" });
        }

        const property = propList.properties.find((prop: Properties) => prop.id === propId);

        if (!property) {
            return res.status(404).json({ message: "Property not found in this list" });
        }

        const result = await propertiesRepository.remove(property);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
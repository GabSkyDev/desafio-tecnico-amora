import { Request, Response } from "express";
import { AppDataSource } from "../repository/data-source";
import { PropertyList } from "../models/PropertyList";
import { Users } from "../models/Users";

const propertyListRepository = AppDataSource.getRepository(PropertyList);
const userRepository = AppDataSource.getRepository(Users);

export const createPropertyList = async (req: Request<{ userId: string }>, res: Response) => {
    const { userId } = req.params;
    const { name, properties } = req.body;

    try {
        const user = await userRepository.findOneBy({ id: userId })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const newPropertyList = propertyListRepository.create({
            name,
            user,
            properties
        });

        await propertyListRepository.save(newPropertyList);

        return res.status(201).json(newPropertyList);
    } catch (error){
        console.log("Error creating property list: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserPropertyLists = async (req: Request<{ userId: string }>, res: Response) => {
    const { userId } = req.params;

    if(!userId) {
        return res.status(400).json({ message: "Missing user id parameter" })
    }

    try {
        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        const propertyLists = await propertyListRepository.find({
        where: { user: { id: userId } }
        });

        return res.status(200).json(propertyLists);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getPropertyListById = async (req: Request<{ userId: string, listId: string }>, res: Response) => {
    const { userId, listId: propertyId } = req.params;

    if(!userId) {
        return res.status(400).json({ message: "Missing user id parameter" })
    }

    if (!propertyId) {
        return res.status(400).json({ error: "Missing property list id parameter" });
    }

    try {
        const propertyList = await propertyListRepository.findOne({
            where: {
                id: propertyId,
                user: { id: userId }
            }
        });

        if (!propertyList) {
            return res.status(404).json({ message: "Property list not found or does not belong to user" });
        }

        return res.status(200).json(propertyList);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updatePropertyListById = async (req: Request<{ userId: string, listId: string}>, res: Response) => {
    const { userId, listId: propertyId } = req.params; 

    if(!userId) {
        return res.status(400).json({ message: "Missing user id parameter"})
    }

    if (!propertyId) {
        return res.status(400).json({ error: "Missing property list id parameter" });
    }

    try {
        const propertyList = await propertyListRepository.findOne({
            where: {
                id: propertyId,
                user: { id: userId }
            },
            relations: ["properties"]
        });

        if (!propertyList) {
            return res.status(404).json({ error: "Property not found"});
        }

        const { name, properties } = req.body;
        if (name !== undefined) propertyList.name = name;
        if (properties !== undefined) propertyList.properties = properties;

        const result = await propertyListRepository.save(propertyList);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deletePropertyList = async (req: Request<{ userId: string, listId: string}>, res: Response) => {
    const { userId, listId: propertyId } = req.params;

    if(!userId) {
        return res.status(400).json({ message: "Missing user id parameter"})
    }

    if (!propertyId) {
        return res.status(400).json({ error: "Missing property list id parameter" });
    }

    try {
        const propertyList = await propertyListRepository.findOne({
            where: {
                id: propertyId,
                user: { id: userId }
            },
            relations: ["properties"]
        });

        if (!propertyList) {
            return res.status(404).json({ error: "Property not found"});
        }

        const result = await propertyListRepository.remove(propertyList);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

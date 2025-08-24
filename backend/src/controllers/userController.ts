import { Request, Response } from "express";
import { AppDataSource } from "../repository/data-source";
import { Users } from "../models/Users";

const userRepository = AppDataSource.getRepository(Users);

export const getUsers = async (req: Request, res: Response) => {
    const users = await userRepository.find();
    res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const idParam = req.params.id;

    if (!idParam) {
        return res.status(400).json({ error: "Missing user id parameter" });
    }

    const user = await userRepository.findOneBy({ id: idParam });
    res.status(200).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    const idParam = req.params.id;

    if (!idParam) {
        return res.status(400).json({ error: "Missing user id parameter" });
    }

    const user = await userRepository.findOneBy({ id: idParam });

    if (!user) {
        return res.status(404).json({ error: "User not found"});
    }

    userRepository.merge(user, req.body);
    const result = await userRepository.save(user);
    res.status(200).json(result);
};

export const deleteUser = async (req: Request, res: Response) => {
    const idParam = req.params.id;

    if (!idParam){
        return res.status(400).json({ error: "Missing user id parameter"})
    }

    const result = await userRepository.delete(idParam);
    res.status(200).json(result);
};





import { Request, response, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController{
    async create(req: Request, resp: Response){
        const { name, email } = req.body;

        const usersRepository = getRepository(User);

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if(userAlreadyExists){
            return response.status(400).json({
                error: "User already exists!",
            });
        }

        const user = usersRepository.create({
            name,
            email
        });

        await usersRepository.save(user);
        
        return resp.json(user);
    };
}

export { UserController };
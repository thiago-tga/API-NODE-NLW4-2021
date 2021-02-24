import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UserRepository";

class UserController{
    async create(req: Request, resp: Response){
       try{
         const { name, email } = req.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if(userAlreadyExists){
            return resp.status(400).json({
                error: "User already exists!",
            });
        }

        const user = usersRepository.create({
            name,
            email
        });

        await usersRepository.save(user);
        
        return resp.json(user);}
        catch{
            console.error("nem deu certo filho");
            
        }
    };
}

export { UserController };

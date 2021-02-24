import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository"

class SurveyController{
    async create(req: Request, resp: Response){
        const { title, description } = req.body;

        const surveyRepository = getCustomRepository(SurveyRepository)

        const survey = surveyRepository.create({
            title,
            description
        });
        await surveyRepository.save(survey);

        return resp.status(201).json(survey)
    }
};

export { SurveyController };
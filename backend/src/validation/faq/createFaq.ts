import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface CreateFaqRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        question: string;
        answer: string;
    };
}

export const createFaqSchema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
});

import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface UpdateFaqRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        question: string;
        answer: string;
    };
}

export const updateFaqSchema = Joi.object({
    id: Joi.string().required(),
    question: Joi.string(),
    answer: Joi.string(),
});
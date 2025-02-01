import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface GetFaqsRequestSchema
    extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        lang: string;
    };
}

export const getFaqsSchema = Joi.object({
    lang: Joi.string()
        .optional()
        .not("")
        .messages({
            "string.empty": "Language parameter cannot be empty.",
        }),
});

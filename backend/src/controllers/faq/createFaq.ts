import { translateText } from '../../services/translation';
import FAQ from '../../models/faq';
import redisClient from '../../config/redisClient';
import { ValidatedRequest } from 'express-joi-validation';
import { CreateFaqRequestSchema } from '../../validation/faq/createFaq';
import { Error } from '../../error/error';
import { GeneralErrorCodes, R } from '../../error/errorCodes';

const CACHE_KEY = 'faqs';

export const createFaq = async (req: ValidatedRequest<CreateFaqRequestSchema>) => {
    const { question, answer } = req.body;

    const [question_hi, answer_hi, question_bn, answer_bn] = await Promise.all([
        translateText(question, 'hi'),
        translateText(answer, 'hi'),
        translateText(question, 'bn'),
        translateText(answer, 'bn'),
    ]);

    if (question_hi.error || question_bn.error || answer_hi.error || answer_bn.error) {
        throw new Error(400, GeneralErrorCodes.TRANSLATION_ERROR, R.TRANSLATION_ERROR, 'Translation failed. Please try again.');
    }

    const faq = new FAQ({
        question,
        answer,
        question_hi: question_hi.translatedText,
        answer_hi: answer_hi.translatedText,
        question_bn: question_bn.translatedText,
        answer_bn: answer_bn.translatedText,
    });

    await faq.save();
    // Clear caches since data has changed
    await redisClient.del(`${CACHE_KEY}_hi`, `${CACHE_KEY}_bn`);
    return faq;
};
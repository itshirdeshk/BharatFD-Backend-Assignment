import { translateText } from '../../services/translation';
import FAQ from '../../models/faq';
import redisClient from '../../config/redisClient';
import { ValidatedRequest } from 'express-joi-validation';
import { UpdateFaqRequestSchema } from '../../validation/faq/updateFaq';
import { Error } from '../../error/error';
import { GeneralErrorCodes, R } from '../../error/errorCodes';

const CACHE_KEY = 'faqs';

export const updateFaq = async (req: ValidatedRequest<UpdateFaqRequestSchema>) => {
    const { id, question, answer } = req.body;

    if (question && !answer) {
        try {
            const [question_hi, question_bn] = await Promise.all([
                translateText(question, 'hi'),
                translateText(question, 'bn'),
            ]);

            if (question_hi.error || question_bn.error) {
                throw new Error(400, GeneralErrorCodes.TRANSLATION_ERROR, R.TRANSLATION_ERROR, 'Translation failed. Please try again.');
            }

            const faq = await FAQ.findByIdAndUpdate(id, { question, question_hi: question_hi.translatedText, question_bn: question_bn.translatedText });

            // Clear caches since data has changed  
            await redisClient.del(`${CACHE_KEY}_en`, `${CACHE_KEY}_hi`, `${CACHE_KEY}_bn`);

            return faq;
        } catch (error) {
            console.error(error);
        }
    } else if (answer && !question) {
        const [answer_hi, answer_bn] = await Promise.all([
            translateText(answer, 'hi'),
            translateText(answer, 'bn'),
        ]);

        if (answer_hi.error || answer_bn.error) {
            throw new Error(400, GeneralErrorCodes.TRANSLATION_ERROR, R.TRANSLATION_ERROR, 'Translation failed. Please try again.');
        }

        const faq = await FAQ.findByIdAndUpdate(id, { answer, answer_hi: answer_hi.translatedText, answer_bn: answer_bn.translatedText });

        // Clear caches since data has changed
        await redisClient.del(`${CACHE_KEY}_en`, `${CACHE_KEY}_hi`, `${CACHE_KEY}_bn`);

        return faq;
    } else {
        const [question_hi, question_bn, answer_hi, answer_bn] = await Promise.all([
            translateText(question, 'hi'),
            translateText(question, 'bn'),
            translateText(answer, 'hi'),
            translateText(answer, 'bn'),
        ]);

        if (question_hi.error || question_bn.error || answer_hi.error || answer_bn.error) {
            throw new Error(400, GeneralErrorCodes.TRANSLATION_ERROR, R.TRANSLATION_ERROR, 'Translation failed. Please try again.');
        }

        const faq = await FAQ.findByIdAndUpdate(id, {
            question,
            answer,
            question_hi: question_hi.translatedText,
            question_bn: question_bn.translatedText,
            answer_hi: answer_hi.translatedText,
            answer_bn: answer_bn.translatedText,
        });

        // Clear caches since data has changed
        await redisClient.del(`${CACHE_KEY}_en`, `${CACHE_KEY}_hi`, `${CACHE_KEY}_bn`);
        return faq;
    }
};
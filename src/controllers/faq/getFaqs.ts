import redisClient from '../../config/redisClient';
import FAQ, { IFaq } from '../../models/faq';
import { ValidatedRequest } from 'express-joi-validation';
import { GetFaqsRequestSchema } from '../../validation/faq/getFaqs';

const CACHE_KEY = 'faqs';

export const getFaqs = async (req: ValidatedRequest<GetFaqsRequestSchema>) => {
    const lang = req.query.lang ? String(req.query.lang) : 'en';

    // Try to get cached data for the language
    const cached = await redisClient.get(`${CACHE_KEY}_${lang}`);
    if (cached) {
        return JSON.parse(cached);
    }

    const faqs: IFaq[] = await FAQ.find();
    const result = faqs.map((faq) => faq.getTranslated(lang));

    await redisClient.set(`${CACHE_KEY}_${lang}`, JSON.stringify(result));
    return result;
};
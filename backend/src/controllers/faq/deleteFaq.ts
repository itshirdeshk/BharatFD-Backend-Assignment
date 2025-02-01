import FAQ from '../../models/faq';
import redisClient from '../../config/redisClient';
import { ValidatedRequest } from 'express-joi-validation';
import { DeleteFaqRequestSchema } from '../../validation/faq/deleteFaq';

const CACHE_KEY = 'faqs';

export const deleteFaq = async (req: ValidatedRequest<DeleteFaqRequestSchema>) => {
    const { id } = req.params;

    await FAQ.findByIdAndDelete(id);
    
    await redisClient.del(`${CACHE_KEY}_en`, `${CACHE_KEY}_hi`, `${CACHE_KEY}_bn`);
    return { id };
};
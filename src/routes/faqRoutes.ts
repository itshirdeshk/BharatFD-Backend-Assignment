import { Router } from "express";
import { afterParamsValidation, afterPayloadValidation, afterQueryValidation } from "../middlewares/requestValidation";
import { createFaqSchema } from "../validation/faq/createFaq";
import { createControllerHandlerFor } from "../middlewares/controllerHandler";
import { createFaq } from "../controllers/faq/createFaq";
import { updateFaqSchema } from "../validation/faq/updateFaq";
import { updateFaq } from "../controllers/faq/updateFaq";
import { deleteFaqSchema } from "../validation/faq/deleteFaq";
import { deleteFaq } from "../controllers/faq/deleteFaq";
import { getFaqsSchema } from "../validation/faq/getFaqs";
import { getFaqs } from "../controllers/faq/getFaqs";

const router = Router();

router.post('/faq', afterPayloadValidation(createFaqSchema), createControllerHandlerFor(createFaq));

router.put('/faq', afterPayloadValidation(updateFaqSchema), createControllerHandlerFor(updateFaq));

router.delete('/faq/:id', afterParamsValidation(deleteFaqSchema), createControllerHandlerFor(deleteFaq));

router.get('/faq', afterQueryValidation(getFaqsSchema), createControllerHandlerFor(getFaqs));

export default router;
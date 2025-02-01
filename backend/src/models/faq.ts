import { Schema, model, Document } from 'mongoose';

export interface IFaq extends Document {
    question: string;
    answer: string;
    question_hi?: string;
    answer_hi?: string;
    question_bn?: string;
    answer_bn?: string;
    getTranslated(lang: string): { question: string; answer: string };
}

const FaqSchema = new Schema<IFaq>({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    question_hi: { type: String },
    answer_hi: { type: String },
    question_bn: { type: String },
    answer_bn: { type: String },
});

// Instance method to return translations with fallback to English.
FaqSchema.methods.getTranslated = function (lang: string) {
    let question = this.question;
    let answer = this.answer;

    if (lang === 'hi' && this.question_hi && this.answer_hi) {
        question = this.question_hi;
        answer = this.answer_hi;
    } else if (lang === 'bn' && this.question_bn && this.answer_bn) {
        question = this.question_bn;
        answer = this.answer_bn;
    }
    return { question, answer };
};

export default model<IFaq>('Faq', FaqSchema);

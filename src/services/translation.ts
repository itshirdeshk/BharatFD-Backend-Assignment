import { translate } from '@vitalets/google-translate-api';

interface TranslationResult {
    translatedText?: string;
    error?: string;
}

export const translateText = async (text: string, targetLang: string): Promise<TranslationResult> => {
    try {
        const res = await translate(text, { to: targetLang });
        return {
            translatedText: res.text,
        };
    } catch (error) {
        console.error(`Translation error for language ${targetLang}:`, error);
        return {
            error: 'Translation failed',
        }
    }
};

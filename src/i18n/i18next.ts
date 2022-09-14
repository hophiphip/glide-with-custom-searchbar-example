import i18n from 'i18next'

import { initReactI18next } from 'react-i18next'

import enResource from '../resources/en.json'
import zhResource from '../resources/zh.json'

export type Language = 'en' | 'zh';

export type LanguageName = {
    [key in Language]: string;
};

type Resources = {
    [key in Language]: {
        translation: {}
    }
};

export const languageNames: LanguageName = {
    en: 'English',
    zh: '中文',
};

const resources: Resources = {
    en: {
        translation: enResource,
    },
    zh: {
        translation: zhResource,
    }
};

i18n
.use(initReactI18next)
.init({
    resources,
    lng: 'en',
    interpolation: {
        escapeValue: false,
    },
    debug: true,
});

export const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language);
};

export default i18n
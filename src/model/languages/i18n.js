import i18n from 'i18next';
import english from './engilsh.json';
import arabic from './arabic.json';
import { initReactI18next } from 'react-i18next'
import { I18nManager } from 'react-native'


const resources= {
    en: english,
    ar: arabic

};

i18n
.use(initReactI18next)
.init({
    
    resources,
    lng: I18nManager.isRTL ? 'ar' : 'en',
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
        escapeValue: false, // react already safes from xss
    },

    react: {
        useSuspence: false,
    },
});
export default i18n;
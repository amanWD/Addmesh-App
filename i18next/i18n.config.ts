import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {am, en} from './translations';

const resources = {
  en: {
    translation: en,
  },
  am: {
    translation: am,
  },
};

i18next.use(initReactI18next).init({
  debug: true,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18next;

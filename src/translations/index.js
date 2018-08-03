import i18next from 'i18next';
import moment from 'moment';
import en from './en';
import ru from './ru';

moment.locale('ru');

i18next
  .init({
    interpolation: {
      // React already does escaping
      escapeValue: false,
    },
    lng: 'ru',
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru
      },
    },
  });

export default i18next;
export const T = (...args) => i18next.t(...args);
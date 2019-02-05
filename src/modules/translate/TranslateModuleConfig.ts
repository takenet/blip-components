import { translate } from 'angular';
import { CalendarLocalization } from './CalendarLocalization';

export const TranslateModuleConfig = (
    $provide,
    $translateProvider: translate.ITranslateProvider
) => {
    // Calendar translate by locale
    CalendarLocalization($provide, 'NG_TRANSLATE_LANG_KEY');

    $translateProvider
        .useLoader('AsyncTranslationLoader')
        .registerAvailableLanguageKeys(['en', 'pt'], {
            'en_*': 'en',
            'en-*': 'en',
            'pt_*': 'pt',
            'pt-*': 'pt',
        })
        .useSanitizeValueStrategy('sanitizeParameters')
        .fallbackLanguage('en')
        .preferredLanguage('en')
        .determinePreferredLanguage();

    $translateProvider.useCookieStorage();
};

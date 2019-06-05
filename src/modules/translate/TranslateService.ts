import { IController } from 'angular';
import moment from 'moment';

const AUTH_COOKIE = 'auth';

export default class TranslateService implements IController {
    LANG_KEY: any;
    accountLang: any;

    constructor(
        private $translate,
        private $translateCookieStorage,
        private NG_TRANSLATE_LANG_KEY,
        private $cookies,
    ) {
        'ngInject';
        this.LANG_KEY = NG_TRANSLATE_LANG_KEY;
    }

    $onInit() {}

    setCurrentLanguage(language) {
        this.$translate.use(language);
        moment.locale(language);
    }

    getCurrentLanguage() {
        const userCookie = this.$cookies.getObject(AUTH_COOKIE);
        const account = (userCookie && userCookie.account) ? userCookie.account : {};
        const culture = account.culture || '';

        switch (culture) {
            case 'pt-BR':
                return 'pt';
            case 'en-US':
                return 'en';
            default:
                return this.$translateCookieStorage.get(this.LANG_KEY) || 'en';
        }
    }

    instantTranslate(key) {
        if (!key) {
            return '';
        }

        let translatedKey = this.$translate.instant(key);

        return translatedKey !== key ? translatedKey : key;
    }
}

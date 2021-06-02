import { IController } from 'angular';
import moment from 'moment';

const AUTH_COOKIE = 'auth';

export default class TranslateService implements IController {
    LANG_KEY: any;
    accountLang: any;

    constructor(
        private $translate,
        private NG_TRANSLATE_LANG_KEY,
    ) {
        'ngInject';
        this.LANG_KEY = NG_TRANSLATE_LANG_KEY;
    }

    $onInit() {}

    setCurrentLanguage(language) {
        this.$translate.use(language);
        moment.locale(language);
    }

    instantTranslate(key) {
        if (!key) {
            return '';
        }

        let translatedKey = this.$translate.instant(key);

        return translatedKey !== key ? translatedKey : key;
    }
}

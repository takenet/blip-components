import angular from 'angular';
import 'angular-translate';
import 'angular-translate-loader-partial';
import 'angular-translate-storage-cookie';

import { TranslateModuleConfig } from 'modules/translate/TranslateModuleConfig';
import { AsyncTranslationLoader } from './AsyncTranslationLoader';
import { AsyncTranslationLoaderProvider } from './AsyncTranslationLoaderProvider';

//
export const translateModule = angular
    .module('translate', ['pascalprecht.translate'])
    .config(TranslateModuleConfig)
    .service('AsyncTranslationLoader', AsyncTranslationLoader)
    .provider('AsyncTranslationLoader', AsyncTranslationLoaderProvider)
    .name;

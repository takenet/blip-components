import angular from 'core/angular';
import { translateModule } from './translate';
import 'angular-tooltips';
import 'angular-sanitize';

export const SharedModule = angular
    .module('SharedModules', ['ngSanitize', '720kb.tooltips', translateModule])
    .name;

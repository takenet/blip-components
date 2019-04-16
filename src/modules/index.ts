import angular from 'core/angular';
import { translateModule } from './translate';
import 'angular-tooltips';

export const sharedModules = angular
    .module('sharedModules', ['720kb.tooltips', translateModule])
    .name;

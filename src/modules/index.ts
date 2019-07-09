import angular from 'core/angular';
import { translateModule } from './translate';
import 'angular-tooltips';

export const SharedModule = angular
    .module('SharedModules', ['720kb.tooltips', translateModule])
    .name;

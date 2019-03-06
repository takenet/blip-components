import angular from 'core/angular';
import { translateModule } from './translate';

export const sharedModules = angular
    .module('sharedModules', [translateModule])
    .name;

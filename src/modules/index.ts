import * as angular from 'angular';
import { translateModule } from './translate';

export const sharedModules = angular
    .module('sharedModules', [translateModule])
    .name;

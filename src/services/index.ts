import angular from 'core/angular';
import { AutoSaveService } from 'services/AutoSaveService';
import { LoadingService } from 'services/LoadingService';
import { WindowService } from 'services/WindowService';

export const ServicesModule = angular
    .module('ServicesModule', [])
    .service('AutoSaveService', AutoSaveService)
    .service('LoadingService', LoadingService)
    .service('WindowService', WindowService)
    .name;

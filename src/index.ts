import angular from 'core/angular';
import { SharedModule } from './modules';
import { ServicesModule } from './services';
import { DirectivesModule } from './directives';
import { ComponentsModule } from './components';

const BlipComponents = angular
    .module('BlipComponents', [
        SharedModule,
        ServicesModule,
        DirectivesModule,
        ComponentsModule,
    ])
    .name;


export {
    BlipComponents,
    SharedModule,
    ServicesModule,
    DirectivesModule,
    ComponentsModule,
};

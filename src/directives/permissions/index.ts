import * as angular from 'angular';
import { NgAuthRead } from './authRead.Directive';
import { NgAuthWrite } from './authWrite.Directive';

export const PermissionsDirective = angular
    .module('blipComponents.permissionsDirective', [])
    .directive('ngAuthRead', NgAuthRead.factory)
    .directive('ngAuthWrite', NgAuthWrite.factory)
    .name;

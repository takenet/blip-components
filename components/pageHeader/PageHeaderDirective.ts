import template from './PageHeaderView.html';
import * as angular from 'angular';
import './pageHeader.scss';

/**
 * Directive to create a common page header. If page header has an additional info,
 * you have to use <additional-info></additional-info> element.
 * 
 *  Usage:
 *  import { PageHeaderDirective } from './pageHeader/PageHeaderDirective';
 *  angular.module('x', []).directive('pageHeader', PageHeaderDirective.factory)
 *
 * @param {String} container - the container size for the page header. 'full' is default
 * @param {String} pageTitle - the title of page
 * 
 * Ex.:
 * <page-header page-title="Page title"></page-header>
 *
 */
export class PageHeaderDirective {
    containerWidth: string;
    title: any;
    hasInfo: any;
    container: string;

    //Directive properties
    restrict = 'E';
    template = template;
    transclude = {
        'info': '?additionalInfo',
        'customContent': '?customContent'
    };

    get scope() {
        return {
            container: '@',
            pageTitle: '@',
            backButton: '@',
        };
    }

    compile() {
        return this.link.bind(this);
    }

    link(scope, element, attrs, controller, transcludeFn) {
        const transcludedElement = transcludeFn(scope, undefined, undefined, 'info');
        scope.containerWidth = scope.container ? `container-${scope.container}` : 'container-full';
        scope.hasInfo = transcludedElement || false;
    }

    static factory() {
        return new PageHeaderDirective();
    }
}

export const PageHeaderModule = angular
    .module('blip.components.pageHeaderDirective', [])
    .directive('pageHeader', PageHeaderDirective.factory)
    .name;
    
import angular from 'core/angular';
import template from './PageHeaderView.html';
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
class PageHeader {
    containerWidth: string;
    title: any;
    hasInfo: any;
    container: string;
    isShow: boolean = false;

    //Directive properties
    restrict = 'E';
    template = template;
    transclude = {
        description: '?description',
        info: '?additionalInfo',
        customContent: '?customContent',
        customTitle: '?customTitle',
    };

    get scope() {
        return {
            container: '@',
            pageTitle: '@',
            backButton: '@?',
            goBack: '@?',
            helperTitle: '@?',
            helperBody: '@?',
            helperDoc: '<?',
        };
    }

    compile() {
        return this.link.bind(this);
    }

    link(scope, element, attrs, controller, transcludeFn) {
        const hasTranscludedElement = (slot) => transcludeFn(
            scope,
            undefined,
            undefined,
            slot,
        );
        this.isShow = false;

        scope.containerWidth = scope.container
            ? `container-${scope.container}`
            : 'container-full';
        scope.hasInfo = hasTranscludedElement('info') || false;
        scope.hasCustomTitle = hasTranscludedElement('customTitle') || false;

        scope.goToPrevious = () => window.history.back();
        scope.toggleHelper = () =>
            this.isShow ? this.hideHelper() : this.showHelper();
    }

    hideHelper() {
        const icon = document.getElementById('info-icon');
        const helper = document.getElementById('helper');
        icon.classList.toggle('fadeIn');
        icon.classList.toggle('fadeOut');
        helper.classList.toggle('fadeIn');
        helper.classList.toggle('fadeOut');
        // icon.style.display = 'flex';
        helper.style.display = 'none';
        this.isShow = false;
    }

    showHelper() {
        const icon = document.getElementById('info-icon');
        const helper = document.getElementById('helper');
        icon.classList.toggle('fadeIn');
        icon.classList.toggle('fadeOut');
        helper.style.display = 'flex';
        helper.classList.toggle('fadeOut');
        helper.classList.toggle('fadeIn');
        // icon.style.display = 'none';
        this.isShow = true;
    }

    static factory() {
        return new PageHeader();
    }
}

export const PageHeaderDirective = angular
    .module('blipComponents.pageHeader', [])
    .directive('pageHeader', PageHeader.factory)
    .name;

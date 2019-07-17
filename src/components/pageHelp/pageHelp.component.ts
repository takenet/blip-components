import angular from 'core/angular';
import './pageHelp.scss';
import template from './PageHelpView.html';
class PageHelp {
    public title: string;
    public body: string;
    public docLink: any;
    public helpConfirm: string;

    constructor(private $translate) {
        this.setDocLink();
    }

    async setDocLink() {
        if (!this.docLink) {
            const text = await this.$translate(
                'modules.application.detail.ai.intentions.helperLink.title',
            );
            this.docLink = {
                text,
                link: 'https://help.blip.ai/hc/pt-br',
            };
        }
    }
}

export const PageHelpComponent = angular
    .module('blipComponents.pageHelp', [])
    .component('pageHelp', {
        controller: PageHelp,
        controllerAs: '$ctrl',
        bindings: {
            title: '@',
            body: '@',
            helpConfirm: '@',
            docLink: '<',
            close: '<?',
        },
        template,
    })
    .name;

import './pageHelp.scss';
import template from './PageHelpView.html';
export class PageHelpComponent {
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
            this.helpConfirm = await this.$translate('utils.misc.helperConfirm');
            this.docLink = {
                text,
                link: 'https://help.blip.ai/hc/pt-br',
            };
        }
    }
}

export const PageHelp = {
    controller: PageHelpComponent,
    controllerAs: '$ctrl',
    bindings: {
        title: '@',
        body: '@',
        docLink: '<',
        close: '<?',
    },
    template,
};

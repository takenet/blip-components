import './messageArea.scss';
import angular from 'core/angular';
import MessageAreaView from './messageAreaView.html';
import ComponentController from 'core/base/ComponentController';

const EMPTY_CONTENT = '';
const SUBMIT_KEY_NAME = 'Enter';
const SUBMIT_KEY_CODE = 13;
const DEFAULT_ICON_COLOR = '#333b4b';

class MessageAreaController extends ComponentController {

    public onSubmit: (obj: any) => void;
    public iconColor: string = DEFAULT_ICON_COLOR;
    public content: string = EMPTY_CONTENT;

    keyDown(event: KeyboardEvent): void {
        if (event.key === SUBMIT_KEY_NAME || event.keyCode === SUBMIT_KEY_CODE) {
            event.preventDefault();
            this.submit();
        }
    }

    submit() {
        if (this.content !== EMPTY_CONTENT) {
            this.onSubmit({ $content: this.content });
            this.content = EMPTY_CONTENT;
        }
    }

}

export const MessageAreaComponent = angular
    .module('blipComponents.messageArea', [])
    .component('messageArea', {
        template: MessageAreaView,
        controller: MessageAreaController,
        controllerAs: '$ctrl',
        bindings: {
            placeholder: '@?',
            iconColor: '@?',
            onSubmit: '&',
            disabled: '<?',
        },
    })
    .name;

import './fileUpload.scss';
import template from './fileUploadView.html';
import { ComponentController } from '../base';
import { IComponentOptions, ITimeoutService } from 'angular';
import angular from 'core/angular';

const INPUT_ID = 'file-upload-input';

class FileUploadController extends ComponentController {

    public accept: string;
    public element: HTMLInputElement;

    constructor(
        private $timeout: ITimeoutService,
    ) {
        super();
    }

    $onInit() {
        this.element = document.getElementById(INPUT_ID) as HTMLInputElement;
        this.element.addEventListener('change', this.fileChanged.bind(this));
    }

    public fileChanged(event: Event) {
        let target = event.target as HTMLInputElement;

        if (target.files && target.files.length > 0) {
            this.$timeout(() => this.model = target.files[0], 0);
        }
    }

    public removeFile() {
        this.model = undefined;
        this.element.value = '';
    }

}

export const FileUpload = angular
    .module('blipComponents.fileUploadComponent', [])
    .component('fileUpload', {
        controller: FileUploadController,
        controllerAs: '$ctrl',
        require: {
            ngModel: 'ngModel',
        },
        bindings: {
            disabled: '<?',
            accept: '@',
            selectMessage: '@',
            beforeUploadMessage: '@',
            afterUploadMessage: '@',
        },
        template: template,
    })
    .name;

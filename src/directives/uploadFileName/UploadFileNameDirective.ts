import angular from 'core/angular';
import UploadFileNameView from './UploadFileNameView.html';
import './uploadFileName.scss';

class UploadFileName {

    restrict = 'E';
    template = UploadFileNameView;
    require = 'ngModel';
    replace = true;

    compile() {
        return this.link.bind(this);
    }

    get scope() {
        return {
            file: '=ngModel',
            ngPermission: '=?',
            onFileUploaded: '&',
            fileName: '=?',
            resetIcon: '&?',
            circle: '&?',
        };
    }

    link(scope, element, attrs, ngModel) {
        const x = element[0] as HTMLDivElement;
        setTimeout(() => {
            element.find('input').bind('change', async function() {
                const el = ['image/png', 'image/jpg', 'image/jpeg'].find(
                    (e: string) => {
                        return e === this.files[0].type;
                    },
                );
                if (el) {
                    ngModel.$setDirty();
                    ngModel.$setTouched();
                    scope.onFileUploaded({ $file: this.files[0] });
                    scope.$digest();
                } else {
                    const uploadFile = document.querySelector(
                        '#uploadFile',
                    ) as HTMLInputElement;
                    if (uploadFile && !scope.file) {
                        uploadFile.value = '';
                    }
                    scope.onFileUploaded({});
                }
            });
        });
    }

    static factory() {
        return new UploadFileName();
    }
}

export const UploadFileNameDirective = angular
    .module('blipComponents.uploadFileNameDirective', [])
    .directive('uploadFileName', UploadFileName.factory)
    .name;

import angular from 'core/angular';
import UploadButtonView from './UploadButtonView.html';
import './UploadButton.scss';

class UploadButton {

    restrict = 'E';
    template = UploadButtonView;
    require = 'ngModel';
    replace = true;
    // arrowPath: any = Arrow;

    compile() {
        return this.link.bind(this);
    }

    get scope() {
        return {
            file: '=ngModel',
            ngPermission: '=?',
            round: '=?',
            accept: '=?'
        };
    }

    link(scope, element, attrs, ngModel) {
        scope.accept = scope.accept ? scope.accept : '*';

        element.find('input').bind('change', function() {
            scope.file = this.files[0];
            scope.showFile = false;
            ngModel.$setDirty();
            ngModel.$setTouched();
            scope.$digest();
        });

        const img = document.getElementById('uploaded-img');
        img.addEventListener(
            'load',
            () => {
                scope.showFile = true;
            },
            false,
        );
    }

    static factory() {
        return new UploadButton();
    }
}

export const UploadButtonDirective = angular
    .module('blipComponents.uploadButtonDirective', [])
    .directive('uploadButton', UploadButton.factory)
    .name;

import './UploadArea.scss';
import angular from 'core/angular';
import UploadAreaView from './UploadAreaView.html';

class UploadArea {

    restrict = 'E';
    template = UploadAreaView;
    require = 'ngModel';
    replace = true;

    get scope() {
        return {
            file: '=ngModel',
            ngPermission: '=?',
            round: '=?',
            accept: '=?'
        };
    }

    link(scope, element, attrs, ngModel) {
        scope.hasFileReader = window.FileReader;
        scope.accept = scope.accept ? scope.accept : '*';
        
        element.find('input').bind('change', function() {
            scope.file = this.files[0];
            ngModel.$setDirty();
            ngModel.$setTouched();
            scope.$digest();
        });

        if (!scope.hasFileReader) {
            scope.file = undefined;
        }

        if (scope.hasFileReader) {
            element.bind('dragstart', (event) => {
                // workaround: must call setData on Firefox, otherwise drag won't work
                event.dataTransfer.setData('text', 'drag-me');
                event.dataTransfer.effectAllowed = 'copyMove';
            });
            element.bind('dragenter dragover', (event) => {
                event.preventDefault();
                event.stopPropagation();
                event.dataTransfer.dropEffect = 'copy';
                scope.dragover = true;
                scope.$digest();
                return false;
            });
            element.bind('dragleave', (event) => {
                event.preventDefault();
                event.stopPropagation();
                scope.dragover = false;
                scope.$digest();
                return false;
            });
            element.bind('drop', (event) => {
                event.preventDefault();
                event.stopPropagation();
                scope.dragover = false;

                if (event.dataTransfer.files.length > 0) {
                    scope.file = event.dataTransfer.files[0];
                } else {
                    let html = event.dataTransfer.getData('text/html');
                    let src = angular.element(html).attr('src');
                    scope.file = src;
                }
                ngModel.$setDirty();
                ngModel.$setTouched();

                scope.$apply();
            });

            scope.removeFile = () => {
                scope.file = undefined;
                ngModel.$setDirty();
                ngModel.$setTouched();
                element.find('input').val(null);
                return false;
            };
            scope.selectFile = () => {
                setTimeout(() => element.find('input')[0].click(), 0);
                return false;
            };
        }
    }

    static factory() {
        return new UploadArea();
    }
}

export const UploadAreaDirective = angular
    .module('blipComponents.uploadAreaDirective', [])
    .directive('uploadArea', UploadArea.factory)
    .name;

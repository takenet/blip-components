import angular from 'angular';
import UploadButtonView from './UploadButtonView.html';
import './UploadButton.scss';
export default class UploadButtonDirective {
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
        };
    }

    link(scope, element, attrs, ngModel) {
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
        return new UploadButtonDirective();
    }
}

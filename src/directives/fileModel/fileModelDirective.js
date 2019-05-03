class FileModel {
    constructor() {
        this.restrict = 'A';
        this.require = 'ngModel';
    }

    get scope() {
        return {
            fileModel: '=',
        };
    }

    link(scope, element, attrs, ngModel) {
        element.bind('change', function() {
            if (this.files.length === 1) {
                ngModel.$setViewValue(this.files[0], 'change');
            } else {
                ngModel.$setViewValue(this.files, 'change');
            }
            ngModel.$setDirty();
            ngModel.$setTouched();
        });
    }

    static factory() {
        return new FileModel();
    }
}

export const FileModelDirective = angular
    .module('blipComponents.fileModel', [])
    .directive('fileModel', FileModel.factory)
    .name;

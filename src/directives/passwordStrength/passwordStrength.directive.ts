import './passwordStrength.scss';
import angular from 'core/angular';

class PasswordStrength {
    require = {
        ngModel: 'ngModel',
    };

    template = `
        <div class="password-strength-wrapper">
            <span class="column str-lvl lvl-one {{strengthClass}}"></span>
            <span class="column str-lvl lvl-two {{strengthClass}}"></span>
            <span class="column str-lvl lvl-three {{strengthClass}}"></span>
        </div>
    `;

    restric = 'E';

    link(scope, element, attrs, ngModel) {
        attrs.$observe('ngModel', (value) => {
            scope.$watch(value, (newValue) => {
                scope.strengthClass = this.setStrength(scope, newValue);
            });
        });
    }

    setStrength(scope, password) {
        let minRequirementsRegex = new RegExp('^(?=.{6,})');

        if (password === undefined) {
            return '';
        }

        if (!minRequirementsRegex.test(password)) {
            return '';
        }

        let strongRegex = new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*\\.\\-_])(?=.{8,})',
        );
        let mediumRegex = new RegExp(
            '^((?=.*[a-z])|(?=.*[A-Z]))(?=.*[0-9])(?=.{6,})',
        );

        if (strongRegex.test(password)) {
            return 'strong';
        } else if (mediumRegex.test(password)) {
            return 'medium';
        } else {
            return 'weak';
        }
    }

    static factory() {
        return new PasswordStrength();
    }
}

export const PasswordStrengthDirective = angular
    .module('blipComponents.passwordStrengthDirective', [])
    .directive('passwordStrength', PasswordStrength.factory)
    .name;

import angular from 'core/angular';

const assignProperties = (props) => (srcElement) => (targetElementStyleObj) =>
    props.forEach((p) => (targetElementStyleObj[p] = srcElement[p]));

class AutoExpand {
    ghostElement: any;
    require: string;
    restrict: string;
    scope: boolean;
    transclude: boolean;

    constructor(private $timeout, private $sce) {
        this.require = '?ngModel';
        this.restrict = 'A';
        this.scope = false;
        this.transclude = false;
    }

    static factory($timeout, $sce) {
        return new AutoExpand($timeout, $sce);
    }

    compile() {
        return this.link.bind(this);
    }

    link(scope, element, attrs, ngModel) {
        element.bind('input', this._resize.bind(this, element, attrs));
        element.bind('change', this._resize.bind(this, element, attrs));
        element.bind('keyup', this._resize.bind(this, element, attrs));

        scope.$on('$destroy', () => {
            element.unbind('input');
            element.unbind('change');
            element.unbind('keyup');
        });

        attrs.$set('rows', '1');

        if (attrs.autoExpand === 'initial' || attrs.autoExpand === 'both') {
            ngModel.$formatters.push((value) => {
                this.$timeout(() => {
                    this._resize(element, attrs);
                    this._resizeInput(element, attrs);
                    let changeEvent = new Event('change');
                    element[0].dispatchEvent(changeEvent);
                });
                return value;
            });
        }
    }

    _resize(element, attrs) {
        switch (element[0].tagName) {
            case 'INPUT':
                this._resizeInput(element, attrs);
                break;
            case 'TEXTAREA':
                this._resizeTextArea(element, attrs);
                break;
            default:
                break;
        }
    }

    _resizeInput(element, attrs) {
        const inputStyle = getComputedStyle(element[0]);
        const mainContentElement = document.getElementById('main-content-area');
        const menuAreaElement = document.getElementById('menu-area');
        if (!this.ghostElement) {
            this.ghostElement = document.createElement('div');
            document.body.appendChild(this.ghostElement);
            this.ghostElement.style.visibility = 'hidden';
        }

        this.ghostElement.style.display = 'inline-block';
        assignProperties([
            'fontSize',
            'fontFamily',
            'paddingRight',
            'paddingLeft',
            'letterSpacing',
            'textTransform'
        ])(inputStyle)(this.ghostElement.style);

        this.ghostElement.innerHTML = this.$sce.getTrustedHtml(element[0].value) || attrs.placeholder;
        const growingWidth = this.ghostElement.offsetWidth + 10;
        let inputWidth = growingWidth;
        if (mainContentElement && menuAreaElement) {
            const maxWidth =
                mainContentElement.clientWidth - menuAreaElement.offsetWidth;
            inputWidth = Math.min(growingWidth, maxWidth);
        }
        element[0].style.width = inputWidth + 'px';
        this.ghostElement.style.display = 'none'; // Avoid unecessary page scroll
    }

    _resizeTextArea(element, attrs) {
        if (attrs.autoExpand === 'both') {
            this._resizeInput(element, attrs);
        }
        if (
            attrs &&
            attrs.autoExpandMaxHeight &&
            element[0].offsetHeight >= attrs.autoExpandMaxHeight
        ) {
            element.css({ height: attrs.autoExpandMaxHeight + 'px' });

            return;
        }

        element.css({ height: 'auto', 'min-height': 'auto' });

        const gutter = 6;
        element.css({ height: element[0].scrollHeight + gutter + 'px' });
    }
}

export const AutoExpandDirective = angular
    .module('blipComponents.autoExpand', [])
    .directive('autoExpand', AutoExpand.factory).name;

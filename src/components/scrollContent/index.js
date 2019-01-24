import './scrollContent.scss';

let ScrollContentComponent = {
    template: `
    <div class="scroll-content" ng-style="$ctrl.style" ng-transclude></div>
    `,
    controller: class {
        get style() {
            return {
                'max-height':
                    typeof this.height === 'number'
                        ? `${this.height}px`
                        : 'auto',
            };
        }
    },
    controllerAs: '$ctrl',
    transclude: true,
    bindings: {
        height: '<',
    },
};

export default ScrollContentComponent;

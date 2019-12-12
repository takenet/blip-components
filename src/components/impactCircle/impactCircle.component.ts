import angular from 'core/angular';
import template from './ImpactCircleView.html';
import './ImpactCircle.scss';

class ImpactCircleController {
    description: string;
    impactEvaluation: number;
    total: number;
    percentage: number;
    constructor(private $scope, private $element) {
        this.$scope.$watch('$ctrl.impactEvaluation', (newValue, oldValue) => {
            if (newValue !== oldValue) {
                this.percentage = (newValue / this.total) * 100;
                const element = this.$element[0] as HTMLElement;

                const circle = element.querySelector(
                    '.users-graph-outer',
                ) as HTMLDivElement;
                const ring = element.querySelector(
                    '.users-graph-outer .color-ring',
                ) as HTMLDivElement;

                if (!circle || !ring) {
                    return;
                }
                if (this.percentage === 0) {
                    ring.style.opacity = '0';
                    circle.style.background = '#efefef';
                } else if (this.percentage === 100) {
                    ring.style.opacity = '0';
                    circle.style.background = '#0cc8cc';
                } else {
                    circle.style.background = 'transparent';
                    ring.style.opacity = '1';
                    ring.style.background = `linear-gradient(90deg,#0cc8cc ${this
                        .percentage - 10}%, #efefef ${this.percentage}%)`;
                }
            }
        });
    }

    get impactValue() {
        return this.processImpact(this.impactEvaluation);
    }

    private processImpact(pNumber: number): string {
        let final;
        switch (true) {
            case pNumber > 1000000:
                final =
                    '+' +
                    String(Math.floor(pNumber / 1000000) * 1000000)
                        .split('0')[0]
                        .concat('M');
                break;
            case pNumber > 100000:
                final =
                    '+' +
                    String(Math.floor(pNumber / 100000) * 100000)
                        .split('0')[0]
                        .concat('00K');
                break;
            case pNumber > 10000:
                final =
                    '+' +
                    String(Math.floor(pNumber / 10000) * 10000)
                        .split('0')[0]
                        .concat('0K');
                break;
            case pNumber > 1000:
                final =
                    '+' +
                    String(Math.floor(pNumber / 1000) * 1000)
                        .split('0')[0]
                        .concat('K');
                break;
            case pNumber > 100:
                final = '+' + String(Math.floor(pNumber / 100) * 100);
                break;
            case pNumber > 10:
                final = '+' + String(Math.floor(pNumber / 10) * 10);
                break;
            default:
                final = String(pNumber);
                break;
        }
        return final;
    }
}

export const ImpactCircleComponent = angular
    .module('blipComponents.impactCircle', [])
    .component('impactCircle', {
        template,
        controller: ImpactCircleController,
        controllerAs: '$ctrl',
        bindings: {
            impactEvaluation: '<?',
            description: '<',
            total: '<?',
        },
    })
    .name;

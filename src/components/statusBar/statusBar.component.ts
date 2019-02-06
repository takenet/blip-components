import './statusbar.scss';
import * as angular from 'angular';
import { IScope } from 'angular';
import * as uuid from 'uuid';
export class StatusBarComponent {
    public percentageValue: number;
    public tooltipText: any;
    public tooltipSentence: string = '';
    public hasTooltip: boolean = false;
    public id: string;
    public wrapper: HTMLDivElement;
    constructor(private $scope: IScope, private $translate: any) {
        'ngInject';
        if (this.tooltipText) {
            this.hasTooltip = true;
        }
        this.id = uuid.v4();
        new Promise((resolve, reject) => {
            setTimeout(() => {
                this.wrapper = document.getElementById(
                    this.id,
                ) as HTMLDivElement;
                resolve();
            }, 0);
        }).then(() => {
            this.$scope.$watch('$ctrl.percentageValue', () => {
                this.checkPercentage();
            });
        });
    }
    checkPercentage() {
        this.percentageValue >= 0.75
            ? this.setStatusBar(3, '#7ED321')
            : this.percentageValue > 0.33
                ? this.setStatusBar(2, '#F5A623')
                : this.setStatusBar(1, '#F76556');
    }

    clearColor() {
        const elements = Array.prototype.slice.call(
            this.wrapper.querySelectorAll('.status-bar-wrapper .cell'),
        );
        elements.map((e) => {
            e.style.backgroundColor = 'transparent';
            e.style.border = '1px solid #a0a0a0';
        });
    }

    setStatusBar(nCells, color) {
        this.clearColor();

        let elements = Array.prototype.slice.call(
            this.wrapper.querySelectorAll(
                `.status-bar-wrapper .cell:nth-child(-n + ${nCells})`,
            ),
        );

        elements.map((e) => {
            e.style.backgroundColor = color;
            e.style.border = `1px solid ${color}`;
        });
    }
}

export const StatusBar = {
    controller: StatusBarComponent,
    controllerAs: '$ctrl',
    transclude: true,
    bindings: {
        percentageValue: '<',
        tooltipText: '<?',
    },
    template: `
        <div id="{{$ctrl.id}}" class="status-bar-wrapper">
            <div class="status-bar" tooltips tooltip-template="{{$ctrl.tooltipText}}" tooltip-side="bottom" tooltip-hidden="!$ctrl.hasTooltip">
                <span class="cell"></span>
                <span class="cell"></span>
                <span class="cell"></span>
            </div>
      </div>`,
};

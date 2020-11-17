import angular from 'core/angular';
import { BlipDaterangepicker } from 'blip-toolkit';
import { Component } from 'decorators';
import { IComponentController, IComponentOptions, IRootElementService, ILocaleService, IScope, translate } from 'angular';

@Component({
    template: '',
    bindings: {
        period: '<',
        hasTime: '<?',
        onDateSelection: '&?',
        cancelText: '@',
        applyText: '@',
        startDatePlaceholder: '@?',
        endDatePlaceholder: '@?',
        startTimeText: '@?',
        endTimeText: '@?',
    }
})
export class BlipDaterangePickerController implements IComponentController {
    public hasTime: boolean;
    public cancelText: string;
    public applyText: string;
    public startDatePlaceholder: string;
    public endDatePlaceholder: string;
    public startTimeText: string;
    public endTimeText: string;
    public onDateSelection: ($period) => void;
    public period: { selectedPeriod: { startDate: Date, endDate: Date },
                     validPeriod: { startDate: Date, endDate: Date },
                     maxRange?: number };

    private daterangePicker: BlipDaterangepicker;

    constructor(
        private $element: IRootElementService,
        private $locale: ILocaleService,
        private $scope: IScope,
        private $translate: translate.ITranslateService
    ) {
        this.daterangePicker = new BlipDaterangepicker(this.daterangepickerOptions());
    }

    $onInit() {
        this.$element[0].appendChild(this.daterangePicker.render());
        this.$scope.$watch('$ctrl.period.selectedPeriod', () => {
            this.daterangePicker.selectedPeriod = this.period.selectedPeriod;
        });
    }

    private buildTranslatedArray(arrayType, type) {
        return arrayType.map(
            (_, index) => {
                const translationKey = `DATETIME_FORMATS.${type}.${index}`;
                const translatedValue = this.$translate.instant(translationKey);
                return translationKey === translatedValue
                    ? this.$locale.DATETIME_FORMATS[type][index]
                    : translatedValue;
            }
        );
    }

    private daterangepickerOptions() {
        const options = {
            hasTime: this.hasTime,
            months: this.buildTranslatedArray(this.$locale.DATETIME_FORMATS.MONTH, 'MONTH'),
            weekdays: this.buildTranslatedArray(this.$locale.DATETIME_FORMATS.DAY, 'DAY'),
            cancelText: this.cancelText,
            applyText: this.applyText,
            startDatePlaceholder: this.startDatePlaceholder,
            endDatePlaceholder: this.endDatePlaceholder,
            startTimeText: this.startTimeText,
            endTimeText: this.endTimeText,
            onSelection: this.onSelect.bind(this),
        };

        if (this.period) {
            return {
                ...options,
                selectedPeriod: this.period.selectedPeriod,
                validPeriod: this.period.validPeriod,
                maxRange: this.period.maxRange
            };
        }

        return options;
    }

    onSelect($period) {
        this.period.selectedPeriod = $period;

        if (this.onDateSelection) {
            this.onDateSelection({$period});
        }
    }
}

export const BlipDaterangePickerComponent = angular
    .module('blipComponents.blipDaterangePicker', [])
    .component('blipDaterangePicker', <IComponentOptions>BlipDaterangePickerController)
    .name;

import angular from 'core/angular';
import { BlipDaterangepicker } from 'blip-toolkit';
import { Component } from 'decorators';
import { IComponentController, IComponentOptions, IRootElementService, ILocaleService } from 'angular';

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
                     validPeriod: { startDate: Date, endDate: Date } };

    private daterangePicker: BlipDaterangepicker;

    constructor(
        private $element: IRootElementService,
        private $locale: ILocaleService,
    ) {
        this.daterangePicker = new BlipDaterangepicker(this.daterangepickerOptions());
    }

    $onInit() {
        this.$element[0].appendChild(this.daterangePicker.render());
    }

    private daterangepickerOptions() {
        const options = {
            hasTime: this.hasTime,
            months: this.$locale.DATETIME_FORMATS.MONTH,
            weekdays: this.$locale.DATETIME_FORMATS.DAY,
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
            };
        }

        return options;
    }

    onSelect($period) {
        if (this.onDateSelection) {
            this.onDateSelection({$period});
        }
    }
}

export const BlipDaterangePickerComponent = angular
    .module('blipComponents.blipDaterangePicker', [])
    .component('blipDaterangePicker', <IComponentOptions>BlipDaterangePickerController)
    .name;

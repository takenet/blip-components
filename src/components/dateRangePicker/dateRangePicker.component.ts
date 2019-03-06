import angular from 'core/angular';
import * as moment from 'moment';
import * as locale from './locale.json';
import HotelDatepicker from './hotel-datepicker';
import { IRootElementService, INgModelController, IScope } from 'angular';
import './dateRangePicker.scss';
import { getUsFormatDate } from 'data/date';

class DateRangePickerController {
    afterClose: () => any;
    onSelectPeriod: () => any;
    onDayClick: () => any;
    i18n: any;
    datepicker: HotelDatepicker;
    test: any;
    ngModel: INgModelController;
    elementId: string;

    constructor(
        private $element: IRootElementService,
        private $scope: IScope,
        private $translate,
    ) {
        const translateUnit = unit => key => this.$translate.instant(`utils.locale.${unit}.${key}`);

        this.i18n = {
            night: this.$translate.instant('utils.misc.day'),
            nights: this.$translate.instant('utils.misc.days'),
            'day-names-short': [...Object.keys(locale.days).map(translateUnit('days'))],
            'day-names': [...Object.keys(locale.days).map(translateUnit('fullDays'))],
            'month-names-short': [...Object.keys(locale.months).map(translateUnit('months'))],
            'month-names': [...Object.keys(locale.months).map(translateUnit('fullMonths'))],
        };
    }

    set model(value) {
        if (this.ngModel) {
            this.ngModel.$setViewValue(value);
            this.datepicker.setRange(
                new Date(getUsFormatDate(value.start)),
                new Date(getUsFormatDate(value.end)),
            );
        }
    }

    get model() {
        return this.ngModel ? this.ngModel.$viewValue : undefined;
    }

    $onInit() {
        this.$scope.$watch('$ctrl.ngModel', (n, o) => {
            this.model = this.ngModel.$viewValue;
        });
        /**
         * Used document.createElement method because template, for some reason,
         * is rended before $onInit calls. This approach avoids unecessary use of $timeout
         */
        const input = this.$element.find('input')[0];

        this.datepicker = new HotelDatepicker(input, {
            format: 'DD/MM/YYYY',
            selectForward: false,
            startDate: new Date(2000, 1, 1),
            endDate: moment().format('DD/MM/YYYY'),
            moveBothMonths: true,
            showTopbar: false,
            i18n: this.i18n,
            onSelectRange: this.$onSelectRange.bind(this),
            onDayClick: this.onDayClick ? this.onDayClick.bind(this) : undefined,
        });

        input.addEventListener('afterClose', () => {
            if (this.afterClose) {
                this.afterClose();
            }
        });
    }

    private $onSelectRange() {
        const [start, end] = this.datepicker.getValue().split('-');

        this.model = {
            start: moment.utc(getUsFormatDate(start)).format('DD/MM/YYYY'),
            end: moment.utc(getUsFormatDate(end)).format('DD/MM/YYYY'),
        };

        if (this.onSelectPeriod) {
            this.onSelectPeriod();
        }
    }
}

export const DateRangePickerComponent = angular
    .module('blipComponents.dateRangePicker', [])
    .component('dateRangePicker', {
        template: '<input class="date-range-picker">',
        controller: DateRangePickerController,
        controllerAs: '$ctrl',
        bindings: {
            initialDate: '@?',
            onSelectPeriod: '&?',
            onDayClick: '&?',
            afterClose: '&?',
        },
        require: {
            ngModel: '?ngModel',
        },
    })
    .name;

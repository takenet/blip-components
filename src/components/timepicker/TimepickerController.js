const hoursAndMinutes = (hours, minutes) => new Date(new Date().setHours(hours)).setMinutes(minutes);

export default class TimepickerController {

    constructor() {
        'ngInject';

        this.minTime = this.minTime ? this._parseTime(this.minTime) : hoursAndMinutes(0, 0);
        this.maxTime = this.maxTime ? this._parseTime(this.maxTime) : hoursAndMinutes(23, 59);
        this.step = this.step * 60 * 1000 || 30 * 60 * 1000;

        this.timeOptions = [];
        for (let time = this.minTime; time < this.maxTime; time += this.step) {
            let value = new Date(time);
            let label = value.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            this.timeOptions.push({
                label,
                value: this.type === 'string' ? label : value,
            });
        }
    }

    set selectedTime(value) {
        this.ngModel.$setViewValue(value);
    }
    get selectedTime() {
        return this.ngModel.$viewValue;
    }
}

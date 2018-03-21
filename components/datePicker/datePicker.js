import './datePicker.scss';
import template from "./datePickerView.html";

import angular from 'angular';
import angularTranslate from 'angular-translate';
import 'ob-daterangepicker';
import 'ob-daterangepicker/dist/styles/ob-daterangepicker.css';

import datePickerRange from "./datePickerRange";

const moduleName = 'datePicker';

const module = angular
  .module(moduleName, [
    angularTranslate,
    datePickerRange,
    'obDateRangePicker',
  ])
  .config(config)
  .component('datePicker', {
    bindings: {
      onRangeChange: '&',
      defaultRange: '<',
    },
    controller,
    controllerAs: 'vm',
  });

function config(dateRangePickerConfProvider) {
  dateRangePickerConfProvider.setConfig({
    ranges: [],
    calendarsAlwaysOn: true,
    range: {
      start: moment().add(-7, 'days'),
      end: moment().add(-1, 'days')
    }
  });
}

function controller(dateRangePickerConf, $translate, datePickerRange, $element, $compile, $scope) {
  const vm = this;

  Object.assign(vm, {
    $onInit,
    onApply,
  });

  function $onInit() {
    _compileObDateRangePicker();
    dateRangePickerConf.weekDaysName = moment.weekdaysShort();

    const ranges = datePickerRange.getRanges();
    const localeKeys = Object.keys(ranges).map(k => `datePicker.ranges.${k}`);
    $translate(localeKeys).then(keys => {
      const rangesDefinitions = Object.keys(ranges).map(rangeKey => {
        const rangeOpts = ranges[rangeKey];
        const rangeName = keys[`datePicker.ranges.${rangeKey}`];
        return Object.assign({}, rangeOpts, { name: rangeName });
      });
      dateRangePickerConf.ranges.push(...rangesDefinitions);
    });
  }

  function onApply(start, end) {
    vm.onRangeChange({ start, end });
  }

  function _compileObDateRangePicker() {
    $scope.$applyAsync(() => {
      const element = $element.append(
        $compile(template)($scope)
      );
      $scope.$$postDigest(() => _translateButtons(element)); // eslint-disable-line angular/no-private-call
    });
  }

  function _translateButtons(element) {
    const buttonsLabels = ['cancel', 'apply'];
    const buttonsLabelsKeys = buttonsLabels.map(b => `datePicker.buttons.${b}`);

    $translate(buttonsLabelsKeys).then(keys => {
      buttonsLabels.forEach(label => {
        const button = angular.element(element[0].querySelector(`.drp_btn.${label}`));
        button.text(keys[`datePicker.buttons.${label}`]);
      });
    });
  }
}

export { moduleName as default, module };

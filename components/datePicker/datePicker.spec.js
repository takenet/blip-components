import angular from 'angular';
import 'angular-mocks';

import { templateSubject, findInTemplate } from '../../../spec-utils';
import moduleName from "./datePicker";

describe('datePicker', () => {
  let subject, callback, $translate, dateRangePickerConf, preDefinedRanges, translations, $rootScope;

  beforeEach(angular.mock.module(moduleName, $provide => {
    $translate = jasmine.createSpy();
    Object.assign($translate, {
      storageKey: jasmine.createSpy(),
      storage: jasmine.createSpy(),
      preferredLanguage: jasmine.createSpy(),
    });

    $provide.factory('$translate', () => $translate);
  }));

  beforeEach(inject(($q, _dateRangePickerConf_, _$rootScope_, datePickerRange) => {
    dateRangePickerConf = _dateRangePickerConf_;
    $rootScope = _$rootScope_;

    preDefinedRanges = {
      preDefinedRange1: {
        start: moment(),
        end: moment()
      },
      preDefinedRange2: {
        start: moment(),
        end: moment()
      },
    };

    translations = {
      'datePicker.ranges.preDefinedRange1': 'range 1 translation',
      'datePicker.ranges.preDefinedRange2': 'range 2 translation',
      'datePicker.buttons.cancel': 'cancel button translation',
      'datePicker.buttons.apply': 'apply button translation',
    };

    $translate.and.returnValue($q.when(translations));
    spyOn(datePickerRange, 'getRanges').and.returnValue(preDefinedRanges);
    callback = jasmine.createSpy();
    ({ subject } = templateSubject('<date-picker on-range-change="callback(start, end)">', { callback }));
    $rootScope.$digest();
  }));

  it('translates cancel button after next $digest cycle', () => {
    $rootScope.$digest();
    const button = findInTemplate(subject, '.drp_btn.cancel');
    expect(button.text()).toEqual('cancel button translation');
  });

  it('translates apply button after next $digest cycle', () => {
    $rootScope.$digest();
    const button = findInTemplate(subject, '.drp_btn.apply');
    expect(button.text()).toEqual('apply button translation');
  });

  it('sets correct week days name', () => {
    expect(dateRangePickerConf.weekDaysName).toEqual(moment.weekdaysShort());
  });

  it('translates correct keys', () => {
    const rangeNames = Object.keys(preDefinedRanges);
    expect($translate).toHaveBeenCalledWith(rangeNames.map(r => `datePicker.ranges.${r}`));
  });

  it('adds corrects pre defined ranges', () => {
    expect(dateRangePickerConf.ranges[0]).toEqual(jasmine.objectContaining({
      name: translations['datePicker.ranges.preDefinedRange1'],
      start: preDefinedRanges.preDefinedRange1.start,
      end: preDefinedRanges.preDefinedRange1.end,
    }));
    expect(dateRangePickerConf.ranges[1]).toEqual(jasmine.objectContaining({
      name: translations['datePicker.ranges.preDefinedRange2'],
      start: preDefinedRanges.preDefinedRange2.start,
      end: preDefinedRanges.preDefinedRange2.end,
    }));
  });

  it('calls parent callback when changing date', () => {
    const obDateRangePicker = findInTemplate(subject, 'ob-daterangepicker');
    obDateRangePicker.scope().vm.onApply('start date', 'end date');
    expect(callback).toHaveBeenCalledWith('start date', 'end date');
  });
});

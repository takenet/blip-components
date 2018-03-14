import angular from 'angular';
import 'angular-mocks';

import moduleName from "./datePickerRange";

describe(moduleName, () => {
  let subject;

  beforeEach(angular.mock.module(moduleName));

  beforeEach(inject(datePickerRange => {
    subject = datePickerRange;
  }));

  describe('when getting pre defined ranges', () => {
    it('sets correct ranges', () => {
      const rangeNames = ['today', 'yesterday', 'last3Days', 'last7Days',
        'last14Days', 'last30Days', 'last60Days', 'last90Days'];
      expect(Object.keys(subject.getRanges())).toEqual(rangeNames);
    });

    it("ensures all ranges have the correct pattern", () => {
      const ranges = subject.getRanges();
      Object.keys(ranges).map(rangeKey => {
        const rangeOpt = ranges[rangeKey];
        expect(rangeOpt.start._isAMomentObject).toBe(true);
        expect(rangeOpt.end._isAMomentObject).toBe(true);
      });
    });
  });

  it('gets current user when its set', () => {
    subject.setSelectedRange('range');
    expect(subject.getSelectedRange()).toEqual('range');
  });
});

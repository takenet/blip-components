import angular from 'angular';

const moduleName = 'datePickerRange';

const module = angular
  .module(moduleName, [])
  .factory('datePickerRange', service);

function service() {
  const service = {
    getRanges,
    setSelectedRange,
    getSelectedRange,
  };

  function getRanges() {
    return {
      today: {
        start: moment(),
        end: moment(),
      },
      yesterday: {
        start: moment().add(-1, 'days'),
        end: moment().add(-1, 'days'),
      },
      last3Days: {
        start: moment().add(-3, 'days'),
        end: moment().add(-1, 'days'),
      },
      last7Days: {
        start: moment().add(-7, 'days'),
        end: moment().add(-1, 'days'),
      },
      last14Days: {
        start: moment().add(-14, 'days'),
        end: moment().add(-1, 'days'),
      },
      last30Days: {
        start: moment().add(-30, 'days'),
        end: moment().add(-1, 'days'),
      },
      last60Days: {
        start: moment().add(-60, 'days'),
        end: moment().add(-1, 'days'),
      },
      last90Days: {
        start: moment().add(-90, 'days'),
        end: moment().add(-1, 'days'),
      },
    };
  }

  function setSelectedRange(range) {
    this.range = range;
  }

  function getSelectedRange() {
    return this.range;
  }

  return service;
}

export { moduleName as default, module };

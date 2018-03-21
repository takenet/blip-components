# Date Range Picker Component

## Dependencies
 - moment-with-locales (currently loaded globally)
 - ob-daterangepicker
 - angular-translate

## Example


```javascript
import datePicker from 'datePicker';
import datePickerRange from 'datePickerRange';

function controller(datePickerRange) {
  const vm = this;

  Object.assign(vm, {
    $onInit,
    handleRangeChange
  });

  function $onInit() {
    vm.currentRange = datePickerRange.getSelectedRange() || datePickerRange.getRanges().last7Days;
    vm.handleRangeChange(vm.currentRange.start, vm.currentRange.end);
  }

  function handleRangeChange(startDate, endDate) {
    datePickerRange.setSelectedRange({
      start: startDate,
      end: endDate,
    });

    // ....
  }
}
```

```html
<date-picker on-range-change="vm.handleRangeChange(start, end)" default-range="vm.currentRange"></date-picker>
```

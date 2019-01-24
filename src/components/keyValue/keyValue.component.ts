import template from './KeyValueView.html';
import './KeyValue.scss';
import { IFormController } from 'angular';
import { EventEmitter } from 'modules/shared/EventEmitter';
import { ChangeTabEvent } from 'modules/ui/contentTabs';

class KeyValueController {
    onError: () => {};
    onChange: () => {};
    onToggleValue: (obj: any) => {};
    keyValueForm: IFormController;
    ngModel: any;
    keyPlaceholder: string;
    valuePlaceholder: string;
    addButtonText: string = 'utils.misc.addButtonDefault';
    keyValues: {
        key: string;
        value: string;
        toggled: boolean;
        $setValidity?: any;
    }[] = [];
    isFirst: boolean = true;
    expandable: boolean;

    constructor(private $scope) {
        this.$scope.$watchCollection('$ctrl.model', () => {
            if (this.isFirst) {
                this.setKeyValues();
                this.isFirst = false;
            }
        });

        const deregisterChangeTabEvent = this.$scope.$on(ChangeTabEvent, () => {
            if (this.expandable) {
                this.toggleItem('', true);
            }
        });

        this.$scope.$on('$destroy', () => {
            deregisterChangeTabEvent();
        });
    }

    set model(value) {
        if (this.ngModel) {
            this.ngModel.$setViewValue(value);
        }
    }
    get model() {
        return this.ngModel ? this.ngModel.$viewValue : undefined;
    }

    $onInit() {}

    // deserialize Object to array of keyValue
    setKeyValues() {
        this.keyValues = [];

        if (this.model) {
            Object.keys(this.model).map((key) => {
                this.keyValues = this.keyValues.concat({
                    key: key,
                    value: this.model[key],
                    toggled: false,
                });
            });
        }
    }

    // serialize array of keyValue into Object
    getObjectFromKeyValues() {
        let newModel;
        this.keyValues.map((kV) => {
            if (
                kV.key != undefined &&
                kV.value != undefined &&
                kV.key != '' &&
                kV.value != ''
            ) {
                let key = kV.key;

                if (kV.key.toLowerCase().indexOf('ssml') !== -1) {
                    key = 'assistant.ssml';
                }

                newModel = {
                    ...newModel,
                    [key]: kV.value,
                };
            }
        });

        this.model = { ...newModel };
    }

    addNewItem() {
        this.keyValues = this.keyValues.concat({
            key: '',
            value: '',
            toggled: false,
        });
    }

    delete(index) {
        this.keyValues.splice(index, 1);
        this.getObjectFromKeyValues();
    }

    trySaveKey(newKey, oldKey, index) {
        if (newKey === oldKey) {
            return;
        }

        if (newKey == undefined || newKey.length == 0) {
            return;
        }

        if (this.keyValues.some((item) => item.key == newKey)) {
            this.keyValueForm['form' + index].key.$setValidity(
                'duplicated',
                false,
            );
            return;
        }

        this.keyValueForm['form' + index].key.$setValidity('duplicated', true);
        this.keyValues[index].key = newKey;
        this.getObjectFromKeyValues();
    }

    trySaveValue(newValue, oldValue, index) {
        if (newValue === oldValue || newValue == undefined) {
            return;
        }

        if (
            !(oldValue == undefined || oldValue.length == 0) &&
            this.keyValueForm['form' + index].$invalid
        ) {
            return;
        }

        this.keyValues[index].value = newValue;
        this.getObjectFromKeyValues();
    }

    toggleExpandValue($event) {
        if (this.onToggleValue) {
            const toggled = this.toggleItem($event.model.key);

            this.onToggleValue(EventEmitter({
                ...$event,
                toggled
            }));
        }
    }

    toggleItem(key: string, allOff: boolean = false): boolean {
        let toggled = false;

        this.keyValues.forEach(item => {
            if (!allOff && item.key == key) {
                item.toggled = !item.toggled;
                toggled = item.toggled;
            } else {
                item.toggled = false;
            }
        });

        return toggled;
    }
}

export const KeyValueComponent = {
    template,
    controller: KeyValueController,
    controllerAs: '$ctrl',
    bindings: {
        onError: '&',
        onChange: '&',
        onToggleValue: '&?',
        keyPlaceholder: '@?',
        valuePlaceholder: '@?',
        addButtonText: '@?',
        expandable: '<?',
        editorLanguage: '<?',
    },
    require: {
        ngModel: 'ngModel',
    },
};

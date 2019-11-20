import angular from 'core/angular';
import { BlipSelect } from 'blip-toolkit';
import * as uuid from 'uuid';
import { IComponentController, IOnChangesObject } from 'angular';
import { ComponentController } from '../base';
import { EventEmitter } from 'shared/EventEmitter';
const BLIP_SELECT_PREFIX = 'blip-select-';

export const ClearInputEvent = 'blip-select:clearInput';

enum BlipSelectCallback {
    OnBeforeOpenSelect,
    OnAfterOpenSelect,
    OnBeforeCloseSelect,
    OnAfterCloseSelect,
    OnInputChange,
    OnSelectOption,
    OnFocus,
    OnBlur,
    OnAddOption,
}

class BlipSelectController extends ComponentController
    implements IComponentController {
    //
    options: any;
    selectOptions: any;
    mode: string;
    placeholder: string;
    label: string;
    blipSelectInstance: any;
    elementId: string;
    canAddOptions: object;
    extraDataModel: object;
    clearAfterAdd: boolean;
    disabled: boolean;
    invalid: boolean;
    descriptionPosition: string;
    placeholderIcon: string;
    //Callbacks
    onBeforeOpenSelect: () => void;
    onAfterOpenSelect: () => void;
    onBeforeCloseSelect: () => void;
    onAfterCloseSelect: () => void;
    onInputChange: ($event) => void;
    onFocus: ($event) => void;
    onBlur: ($event) => void;
    onAddOption: ($event) => void;
    onSelectOption: ($event) => void;
    customSearch: ($event) => void;

    constructor(
        private $element,
        private $translate,
        private $rootScope,
        private $scope,
    ) {
        super();
        this.elementId = `${BLIP_SELECT_PREFIX}${uuid.v4()}`;
    }

    $onInit() {
        const instanceOptions = {
            placeholder: this.placeholder || '',
            mode: this.mode || 'select',
            disabled: this.disabled || false,
            invalid: this.invalid || false,
            descriptionPosition: this.descriptionPosition || 'right',
            placeholderIcon: this.placeholderIcon,
            onBeforeOpenSelect: this.handle.bind(
                this,
                BlipSelectCallback.OnBeforeOpenSelect,
            ),
            onAfterOpenSelect: this.handle.bind(
                this,
                BlipSelectCallback.OnAfterOpenSelect,
            ),
            onBeforeCloseSelect: this.handle.bind(
                this,
                BlipSelectCallback.OnBeforeCloseSelect,
            ),
            onAfterCloseSelect: this.handle.bind(
                this,
                BlipSelectCallback.OnAfterCloseSelect,
            ),
            onInputChange: this.handle.bind(
                this,
                BlipSelectCallback.OnInputChange,
            ),
            onSelectOption: this.handle.bind(
                this,
                BlipSelectCallback.OnSelectOption,
            ),
            onFocus: this.handle.bind(this, BlipSelectCallback.OnFocus),
            onBlur: this.handle.bind(this, BlipSelectCallback.OnBlur),
            onAddOption: this.handle.bind(this, BlipSelectCallback.OnAddOption),
            customSearch: this.customSearch
                ? this.handleCustomSearch.bind(this)
                : undefined,
            noResultsText: this.$translate.instant(
                'utils.misc.noSearchResults',
            ),
            canAddOptions: this.canAddOptions,
            clearAfterAdd: this.clearAfterAdd,
        };

        this.blipSelectInstance = new BlipSelect(instanceOptions);

        this.$element[0].appendChild(
            this.blipSelectInstance.render({
                options: this.options || [],
                inputValue: this.model || '',
                label: this.label,
            }),
        );

        this.$rootScope.$on(ClearInputEvent, () => {
            this.model = '';
        });

        this.$scope.$watch('$ctrl.model', (model) => {
            if (this.blipSelectInstance) {
                this.setCorrelatedOption(model);
            }
        });
    }

    $onChanges(changesObj: IOnChangesObject) {
        const { options, disabled, invalid, label } = changesObj;

        if (this.blipSelectInstance) {
            if (label) {
                this.blipSelectInstance.render({
                    label: label.currentValue,
                });
            }

            if (options) {
                this.blipSelectInstance.render({
                    options: options.currentValue,
                });

                this.setCorrelatedOption(this.model);
            }

            if (disabled !== undefined) {
                this.blipSelectInstance.render({
                    disabled: disabled.currentValue,
                });
            }

            if (invalid !== undefined) {
                this.blipSelectInstance.render({
                    invalid: invalid.currentValue,
                });
            }
        }
    }

    setCorrelatedOption(value) {
        const correlatedOption =
            this.options && this.options.find((o) => o.value == value);

        if (correlatedOption) {
            this.blipSelectInstance.render({
                inputValue: correlatedOption.label,
            });
        } else if (value) {
            this.blipSelectInstance.render({
                inputValue: value,
            });
        } else {
            this.blipSelectInstance.render({
                inputValue: '',
            });
        }
    }

    handle(type: BlipSelectCallback, emitter) {
        switch (type) {
            case BlipSelectCallback.OnBeforeOpenSelect:
                this.handleOnBeforeOpenSelect();
                break;
            case BlipSelectCallback.OnAfterOpenSelect:
                this.handleOnAfterOpenSelect();
                break;
            case BlipSelectCallback.OnBeforeCloseSelect:
                this.handleOnBeforeCloseSelect();
                break;
            case BlipSelectCallback.OnAfterCloseSelect:
                this.handleOnAfterCloseSelect();
                break;
            case BlipSelectCallback.OnInputChange:
                this.handleOnInputChange(emitter);
                break;
            case BlipSelectCallback.OnSelectOption:
                this.handleOnSelectOption(emitter);
                break;
            case BlipSelectCallback.OnFocus:
                this.handleOnFocus(emitter);
                break;
            case BlipSelectCallback.OnBlur:
                this.handleOnBlur(emitter);
                break;
            case BlipSelectCallback.OnAddOption:
                this.handleOnAddOption(emitter);
                break;
        }
    }

    handleOnBeforeOpenSelect() {
        if (this.onBeforeOpenSelect) {
            this.onBeforeOpenSelect();
        }
    }

    handleOnAfterOpenSelect() {
        if (this.onAfterOpenSelect) {
            this.onAfterOpenSelect();
        }
    }

    handleOnBeforeCloseSelect() {
        if (this.onBeforeCloseSelect) {
            this.onBeforeCloseSelect();
        }
    }

    handleOnAfterCloseSelect() {
        if (this.onAfterCloseSelect) {
            this.onAfterCloseSelect();
        }
    }

    handleOnInputChange({ $event }) {
        if (this.onInputChange) {
            this.onInputChange(EventEmitter({ ...$event }));
        }
    }

    handleOnSelectOption({ $event }) {
        const { optionProps } = $event;
        this.model = optionProps.value;

        if (this.onSelectOption) {
            this.onSelectOption(EventEmitter({ ...$event }));
        }
    }

    handleOnFocus({ $event }) {
        if (this.onFocus) {
            this.onFocus(EventEmitter({ ...$event }));
        }
    }

    handleOnBlur({ $event }) {
        if (this.onBlur) {
            this.onBlur(EventEmitter({ ...$event }));
        }
    }

    handleOnAddOption({ $event }) {
        if (this.onAddOption) {
            this.onAddOption(EventEmitter({ ...$event }));
        }
    }

    handleCustomSearch({ $event }) {
        if (this.customSearch) {
            const { query, items } = $event;
            return this.customSearch(EventEmitter({ query, items }));
        }

        return undefined;
    }
}

export const BlipSelectComponent = angular
    .module('blipComponents.blipSelect', [])
    .component('blipSelect', {
        template: '<div id="{{$ctrl.elementId}}"></div>',
        controller: BlipSelectController,
        controllerAs: '$ctrl',
        bindings: {
            label: '@?',
            placeholder: '@?',
            mode: '@?',
            descriptionPosition: '@?',
            placeholderIcon: '@?',
            onBeforeOpenSelect: '&?',
            onAfterOpenSelect: '&?',
            onBeforeCloseSelect: '&?',
            onAfterCloseSelect: '&?',
            onFocus: '&?',
            onBlur: '&?',
            canAddOptions: '<?',
            clearAfterAdd: '<?',
            onInputChange: '&?',
            onSelectOption: '&?',
            onAddOption: '&?',
            customSearch: '&?',
            options: '<?',
            disabled: '<?',
            invalid: '<?',
        },
        require: {
            ngModel: 'ngModel',
        },
        transclude: true,
    })
    .name;

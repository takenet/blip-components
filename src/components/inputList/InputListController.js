import foldToASCII from 'data/foldToASCII';
import { Save, RepeatedItem, SuccessfullyInsert, ClearInput } from './index';
import uuid from 'uuid';
const isEmptyString = text => !text || text.trim() === '';

export default class {

    constructor($scope, $timeout, PermissionsService) {
        'ngInject';

        this.$scope = $scope;
        this.$timeout = $timeout;
        this.permissionsService = PermissionsService;

        this.items = [];
        this.newItemText = '';
        this.editingItem = undefined;

        this.addItems = this.addItems == undefined ? true : false;
        this.editItems = this.editItems == undefined ? true : false;

        this.$scope.$parent.$on(Save, () => {
            this.addItem(this.newItemText);

            if (this.editingItem) {
                this.finishEditItem(this.editingItem);
            }
        });
    }

    $onInit() {
        this.$scope.$watch('$ctrl.newItemText', () => this._validateRequired());

        this.ngModel.$render = () => {
            this._validateRequired();
            this.items = this.ngModel.$viewValue.map((value, id) => ({ id, value })) || [];
        };
    }

    hasItemInList(list, item) {
        return (!this.limitSpecialChars
            ? list.filter((x) => x.value.toLowerCase() == item.toLowerCase()).length > 0
            : list.filter((x) => foldToASCII(x.value.toLowerCase()) == foldToASCII(item.toLowerCase())).length > 0);
    }

    persistItem(list, item) {
        let repeatedItem;
        if (!this.limitSpecialChars) {
            repeatedItem = list.find((x) => x.value.toLowerCase() == item.value.toLowerCase());
        }
        else {
            repeatedItem = list.find((x) => foldToASCII(x.value.toLowerCase()) == foldToASCII(item.value.toLowerCase()));
        }

        if (repeatedItem) {
            list.remove(repeatedItem);
        }
    }

    //
    addItem(value) {
        if (isEmptyString(value) || !this.canAddMoreItems)
            return;

        const id = uuid.v4();

        if (this.blockRepeatedItems && this.hasItemInList(this.items, value)) {
            this.$scope.$emit(RepeatedItem);
            this.newItemText = '';
            return;
        }
        else if (!this.blockRepeatedItems) {
            this.persistItem(this.items, {id, value});
        }

        value = value.trim().slice(0, this.length || value.length);
        this.items = [{ id, value }, ...this.items];

        this.newItemText = '';
        this.editingItem = undefined;

        this._updateModel();
    }

    moveItem({ id, value }, toIndex) {
        if (this.items.some((item, index) => index === toIndex && item.id === id))
            return;

        this.items = this.items.filter(item => item.id !== id);
        this.items.splice(toIndex, 0, { id, value });
        this._updateModel();
        return true;
    }

    async editItem({ id, value }) {
        let hasPermissions = await this.permissionsService.hasPermissions('write');
        if (!hasPermissions) {
            return;
        }

        if (this.editingItem && this.editingItem.id !== id)
            this.finishEditItem(this.editingItem);

        if (!this.editingItem || this.editingItem.id !== id)
            this.editingItem = { id, value };

        this.$timeout(() => {
            let inputItem = document.getElementById(`input-item-${this.editingItem.id}`);
            inputItem.focus();
        }, 100);
    }

    finishEditItem({ id, value }) {
        const oldItems = this.items;


        if (oldItems.some(item => item.id === id && item.value === value)) {
            this.editingItem = undefined;
            return;
        }

        if (isEmptyString(value)) {
            this.editingItem = undefined;
            this.deleteItem({ id });
            return;
        }

        value = value.trim().slice(0, this.length || value.length);
        this.items = this.items.map(item => item.id === id ? { id, value } : item);

        this.editingItem = undefined;
        this._updateModel();
    }

    deleteItem({ id }) {
        if (this.editingItem)
            this.finishEditItem(this.editingItem);

        this.items = this.items
            .filter(item => item.id !== id)
            .map((item, index) => ({ ...item, id: index }));

        this._updateModel();
    }

    //
    get hasText() {
        return !isEmptyString(this.newItemText);
    }

    get canAddMoreItems() {
        return !this.maxItems || this.items.length < this.maxItems;
    }

    get reorderable() {
        return typeof this._reorderable === 'string';
    }

    //
    _updateModel() {
        if (this.items)
            this.ngModel.$setViewValue(this.items.map(item => item.value));

        this.$scope.$emit(SuccessfullyInsert);
        this.$scope.$broadcast(ClearInput);
        this._validateRequired();
    }

    _validateRequired() {
        if (this.ngModel.$viewValue)
            this.ngModel.$setValidity('required', this.ngModel.$viewValue.length > 0 || !isEmptyString(this.newItemText));
    }
}

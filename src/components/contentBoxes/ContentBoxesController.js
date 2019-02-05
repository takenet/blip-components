import './ContentBoxes.scss';

import EditOptionController from './editors/EditOptionController';
import Modal from './editors/Modal.html';

import '!ng-cache-loader!./partials/box.html';
import '!ng-cache-loader!./partials/destiny.html';
import '!ng-cache-loader!./partials/link.html';

//Templates
import { Box, Destiny, Link } from './templates.js';

export default class ContentBoxesController {
    constructor(ModalService, PermissionsService, $rootScope, ngToast) {
        'ngInject';
        this._modalService = ModalService;
        this.$rootScope = $rootScope;
        this._ngToast = ngToast;
        this._permissionsService = PermissionsService;
        this.$onChanges = () => {
            this.bindPersistentMenu();
        };
        this.init();
    }

    async init() {
        this.hasPermissions = await this._permissionsService.hasPermissions(
            'write',
        );
    }

    bindPersistentMenu() {
        if (!this.ngModel) {
            throw 'Model is required';
        }

        this.ngModel.options.forEach((o) => {
            this.setDepth(o, 0, function() {
                delete this.label;
                delete this.$depth;
                delete this.$onRemove;
            });
        });
    }

    setDepth(option, depth, onRemove) {
        if (option.label) {
            option.$depth = depth;
            option.$onRemove = onRemove;
        }

        if (option.label && option.label.value && option.label.value.options) {
            let options = option.label.value.options;

            if (options) {
                options.forEach((o) => {
                    this.setDepth(o, depth + 1, this.getOnRemove(o, options));
                });
            }
        }
    }

    //Verify if has empty menu
    hasEmptyMenus(option) {
        this.hasEmptyMenu = false;

        if (!option) {
            this.hasEmptyMenus(this.ngModel.options);
        } else {
            option.forEach((o) => {
                let optionLabel = o.label;
                if (
                    optionLabel &&
                    optionLabel.value &&
                    optionLabel.value.options
                ) {
                    if (optionLabel.value.options.length == 0) {
                        this.hasEmptyMenu = true;
                        return;
                    } else {
                        this.hasEmptyMenus(optionLabel.value.options);
                    }
                }
            });
        }

        return this.hasEmptyMenu;
    }

    //Show count items
    maxItensOf(option) {
        let items = option.label.value.options;
        return option ? `${items.length}/${this.childLevelItems}` : '';
    }

    //Verify if is slot available
    isSlotAvailable(index, parent) {
        return !parent
            ? !this.ngModel.options[index].label
            : parent.label.value.options.length < this.childLevelItems;
    }

    //Check if option should be visible
    shouldShowOption(index) {
        return !this.isSlotAvailable(index) || this.hasPermissions;
    }

    //Remove option
    removeOption(option) {
        option.$onRemove();
        this.$rootScope.$broadcast('menuHasChanged');
    }

    //Get onRemove function for each option item
    getOnRemove(option, parentOptions) {
        return () => {
            let index = parentOptions.indexOf(option);
            if (index < 0) return;

            parentOptions.splice(index, 1);
        };
    }

    //Edit option
    async editOption(option) {
        let type = this.getOptionType(option);

        let modalSettings = {
            template: Modal,
            controller: EditOptionController,
            controllerAs: '$ctrl',
            inputs: {
                option: option,
                modalType: type,
            },
        };

        let modal = await this._modalService.showModal(modalSettings);

        return await modal.close;
    }

    //Get Option Type
    getOptionType(option) {
        switch (option.label.type) {
            case 'application/vnd.lime.document-select+json':
                return 'box';
            case 'application/vnd.lime.web-link+json':
                return 'link';
            default:
                return 'destiny';
        }
    }

    //Template for each type passed
    getTemplate(type) {
        let element;
        switch (type) {
            case 'box':
                element = Box();
                break;
            case 'destiny':
                element = Destiny();
                break;
            case 'link':
                element = Link();
                break;
        }

        return element;
    }

    //Add item to ngModel list
    async addToList(type, parent) {
        let optionTemplate = {
            ...this.getTemplate(type),
            $depth: 0,
        };

        let option, options;
        if (!parent) {
            option = optionTemplate;
            options = this.ngModel.options;
            let index;

            for (let i = 0; i < options.length; i++) {
                if (!options[i].label) {
                    index = i;
                    break;
                }
            }

            if (await this.editOption(option)) {
                options[index] = option;
                option.$onRemove = () => (options[index] = {});
            }
        } else {
            options = parent.label.value.options;
            option = {
                ...optionTemplate,
                $depth: (parent.$depth || 0) + 1,
            };

            option.$onRemove = this.getOnRemove(option, options);

            let confirm = await this.editOption(option);
            if (confirm) {
                options.push(option);
            }
        }

        this.$rootScope.$broadcast('menuHasChanged');
    }

    //Verify if config depth is less than current depth plus one
    canAddDepth(option) {
        return option.$depth + 1 < this.maxDepth - 1;
    }

    //Save model passing current model as param
    saveModel() {
        if (this.hasEmptyMenus()) {
            this.blankMenuError({ $item: this.ngModel });
            return;
        }
        this.onSave({ $item: this.ngModel });
    }
}

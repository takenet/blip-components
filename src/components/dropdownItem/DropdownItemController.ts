import './DropdownItem.scss';
export const ToggleDropdownItem = 'ToggleDropdownItem';
export const DropdownItemButtonClicked = 'DropdownItemButtonClicked';
export const DropdownItemClosed = 'DropdownItemClosed';

export class DropdownItemController {
    auxClasses: string;
    hideUpIcon: any;
    align: any;
    direction: any;
    hideIcon: boolean;
    isOpen: boolean;
    minWidth: any;
    divStyle: any;
    maxHeight: any;
    styleValues: any;
    closeOnClick: boolean;
    colorIcon: string;
    widthIcon: string;
    heightIcon: string;
    onOpen: () => void;
    onClose: () => void;

    constructor(private $rootScope, private $timeout, $scope) {
        'ngInject';
        this.isOpen = false;
        this.closeOnClick =
            this.closeOnClick == undefined ? true : this.closeOnClick;
        this.auxClasses = '';
        this.hideIcon = this.hideIcon == undefined ? false : this.hideIcon;
        this.styleValues = {};

        $rootScope.$on(ToggleDropdownItem, () => {
            this.isOpen = false;
        });

        $scope.$on('$stateChangeSuccess', () => {
            document.removeEventListener(
                'click',
                $rootScope.clickOutsideDropdown,
            );
            this.isOpen = false;
        });

        if (this.align) {
            this.auxClasses += `dropdown-align-${this.align}`;
        }
        if (this.hideUpIcon) {
            this.auxClasses += ' dropdown-hide-up-icon';
        }
        if (this.minWidth) {
            this.styleValues['min-width'] = this.minWidth + 'px';
        }
        if (this.maxHeight) {
            this.styleValues.overflow = 'auto';
            this.styleValues['max-height'] = this.maxHeight + 'px';
        }
        this.divStyle = this.styleValues;
    }

    get directionClass() {
        return this.direction
            ? `dropdown-direction-${this.direction}`
            : 'dropdown-direction-bottom';
    }

    get arrowIcon() {
        return this.isOpen ? '\uE5C7' : '\uE5C5';
    }

    clickOutsideDropdown = (e) => {
        let path = [];
        let node = e.target;
        while (node && node.localName != 'body') {
            path.push(node);
            node = node.parentNode;
        }

        let element;

        for (let i = 0; i < path.length; i++) {
            if (path[i].localName == 'ti-tag-item') {
                element = true;
                break;
            } else if (
                path[i].classList &&
                path[i].classList.contains('dropdown-item-content') &&
                this.closeOnClick
            ) {
                element = false;
                break;
            } else if (path[i].localName == 'dropdown-item') {
                element = true;
            }
        }

        if (!element && this.onClose) {
            this.onClose();
        }

        this.$timeout(() => {
            if (!element) {
                this.$rootScope.$emit(DropdownItemClosed);

                this.$rootScope.$broadcast(ToggleDropdownItem);
                document.removeEventListener(
                    'click',
                    this.clickOutsideDropdown,
                );
            }
        });
    }

    toggleOpen(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.isOpen) {
            this.isOpen = false;
            this.$rootScope.$broadcast(ToggleDropdownItem);
            document.removeEventListener('click', this.clickOutsideDropdown);
            window.removeEventListener('blur', this.clickOutsideDropdown);
        } else {
            this.$rootScope.$broadcast(ToggleDropdownItem);
            document.addEventListener('click', this.clickOutsideDropdown);
            window.addEventListener('blur', this.clickOutsideDropdown);
            this.isOpen = !this.isOpen;

            if (this.onOpen) {
                this.onOpen();
            }
        }

        this.$rootScope.$emit(DropdownItemButtonClicked);
    }
}

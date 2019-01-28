import './BuilderSearch.scss';
import template from './BuilderSearchView.html';
import { EventEmitter } from 'shared/EventEmitter';
export const TOGGLE_SEARCH = 'TOGGLE_SEARCH';
class BuilderSearchController {
    showSearch: boolean = false;
    inputText: string = '';
    checkClicksOutsideScope: (event) => void;
    onGetInput: ($event) => {};
    searchListener: any;

    constructor(private $scope, private $element) {
        this.checkClicksOutsideScope = (event) => {
            if (this.inputText) {
                return;
            }
            const onScope =
                event.target.querySelector('#builder-search') ||
                event.target.id === 'builder-search' ||
                event.target.id === 'builder-search-tooltip';
            !onScope && this.clearSearch();
        };

        this.$scope.$watch('$ctrl.inputText', (newValue, oldValue) => {
            if (newValue !== undefined && newValue !== oldValue) {
                this.onGetInput(EventEmitter({ input: newValue }));
            }
        });
    }

    onBlur() {
        if (this.inputText.length === 0) {
            this.onGetInput(EventEmitter({ input: '' }));
        }
    }

    clearSearch() {
        this.inputText = '';
        this.onGetInput(EventEmitter({ input: '' }));
        this.showSearch = false;
        document.removeEventListener('click', this.checkClicksOutsideScope);
        const el = this.$element[0] as HTMLElement;
        const input = el.querySelector('input');
        input && input.blur();
    }

    listenBroad() {
        this.searchListener = this.$scope.$on(
            TOGGLE_SEARCH,
            (event, { showSearch }) => {
                if (typeof showSearch === 'boolean') {
                    this.clearSearch();
                    this.showSearch = showSearch;
                    this.searchListener();
                    this.searchListener = undefined;
                } else {
                    console.error('not a boolean');
                }
            },
        );
    }

    toggleSearch() {
        if (!this.showSearch) {
            const el = this.$element[0] as HTMLElement;
            const input = el.querySelector('input');
            input && input.focus();
            this.showSearch = true;
            !this.searchListener && this.listenBroad();
            setTimeout(() => {
                document.addEventListener(
                    'click',
                    this.checkClicksOutsideScope,
                );
            });
        } else {
            this.clearSearch();
        }
    }
}

export const BuilderSearchComponent = {
    controller: BuilderSearchController,
    controllerAs: '$ctrl',
    bindings: {
        onGetInput: '&?',
    },
    template,
};

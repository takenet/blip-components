import angular from 'core/angular';
import template from './SidenavMenuItemView.html';
import './SidenavMenuItem.scss';

export const SideNavToggleEventNewChildren = 'SideNavToggleExpand';
export const SideNavToggleEventExpand = 'SideNavToggleExpand2';
export const sidenavMenuItem = angular
    .module('blipComponents.sidenavMenuItem', [])
    .component('sidenavMenuItem', {
        template: template,
        controller: class {
            title: any;
            text: any;
            sparams: any;
            sref: any;
            icon: any;
            parent: any;
            baseSref: string;
            childrenActive: boolean;
            _isNewFather: boolean;
            _isNewChildren: boolean;
            hasChildren: any;
            preventDefault: boolean;
            isNew: boolean;
            $onInit: () => void;

            constructor(
                private $state,
                private $element,
                private $rootScope,
            ) {
                'ngInject';
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.$element = $element;
                this.hasChildren = this.hasChildren || false;
                this.preventDefault = this.preventDefault == false ? false : true;
                this._isNewChildren = false;
                this._isNewFather = false;

                if (this.$state.includes(this.sref)) {
                    this.childrenActive = true;
                    this._isNewChildren = true;
                    this._isNewFather = true;
                }
                this.$onInit = () => {
                    this.parent = this._findParent();
                    if (this.parent) {
                        this.parent.hasChildren = true;
                    }

                    $rootScope.$on(SideNavToggleEventNewChildren, () => {
                        this._isNewChildren = false;
                    });

                    $rootScope.$on(SideNavToggleEventExpand, () => {
                        this._isNewFather = false;
                    });

                };
            }

            toggleExpand(e) {
                this.childrenActive = true;

                if (this.isNew) {
                    localStorage.setItem(`clicked-${this.sref}`, 'true');
                    this.isNew = false;
                }
                if (this._isNewChildren && this._isNewFather) {
                    this.$rootScope.$broadcast(SideNavToggleEventExpand);
                } else {
                    this.$rootScope.$broadcast(SideNavToggleEventExpand);
                    this._isNewChildren = true;
                    if (this.hasChildren) {
                        this._isNewFather = true;
                        if (this.preventDefault) {
                            e.preventDefault();
                        }
                    } else {
                        this.$rootScope.$broadcast(SideNavToggleEventNewChildren);
                        this._isNewChildren = true;
                        this.parent = this._findParent();

                        if (this.parent) {
                            this.parent._isNewFather = true;
                            this.childrenActive = true;
                        }
                    }
                }
            }

            get isChildrenActive() {
                //Remove when reports are removed from sidenav
                if (this.sparams && this.$state.params.reportId) {
                    return (
                        this.$state.includes(this.sref) &&
                        this.$state.params.reportId === this.sparams.reportId
                    );
                }

                return this.$state.includes(this.sref);
            }

            get spanStyle() {
                return {
                    'margin-left': this.hasIcon ? '0.9rem' : '0',
                };
            }

            get hasIcon() {
                return typeof this.icon === 'string';
            }

            get chevronIcon() {
                return this._isNewFather ? '\uE316' : '\uE313';
            }

            get href() {
                const stateHref = this.$state.href(this.sref, this.sparams);
                if (this.baseSref) {
                    return this.baseSref.concat(stateHref);
                }
                return stateHref;
            }

            get isExpanded() {
                return this._isNewChildren ? true : false;
            }

            set isExpanded(value) {
                this._isNewChildren = value;
            }

            _findParent(levelMin = 3, levelMax = 4) {
                let $parent = this.$element.parent();
                for (
                    let i = levelMin;
                    i < levelMax;
                    i++, $parent = $parent.parent()
                ) {
                    if ($parent.controller('menuItem')) {
                        return $parent.controller('menuItem');
                    }
                }

                return undefined;
            }
        },
        controllerAs: '$ctrl',
        transclude: true,
        bindings: {
            title: '@',
            text: '@',
            subtitle: '@',
            icon: '@',
            active: '@',
            sref: '@',
            baseSref: '@?',
            sparams: '<',
            preventDefault: '<?',
            hasChildren: '<?',
            childrenActive: '=?',
            isNew: '<?',
            isBeta: '<?',
        },
    })
    .name;

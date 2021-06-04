import angular from 'core/angular';
import { BlipTags } from 'blip-toolkit';
import { ComponentController } from '../base';
import './blipTags.scss';
import * as uuid from 'uuid';
import {
    IComponentController,
    IScope,
    ITimeoutService,
    IOnChangesObject,
} from 'angular';
import { EventEmitter } from 'shared/EventEmitter';
import './blipTags.scss';

const BLIP_TAGS_PREFIX = 'blip-tags';

type BlipTagsMode = 'full' | 'compact';

enum BlipTagsCallback {
    OnTagAdded = 'onTagAdded',
    OnTagRemoved = 'onTagRemoved',
    OnSelectTagColor = 'onSelectTagColor',
    OnTagClick = 'onTagClick',
}

const removeBackgroundOptions = (t) => ({ ...t, canChangeBackground: false });
class BlipTagsController extends ComponentController
    implements IComponentController {
    promptTextCreator: string;
    canAddOptions: boolean;
    mode: BlipTagsMode;
    canChangeBackground: boolean;
    toggleTagsMode: boolean;
    canRemoveTags: boolean;
    onTagAdded: (obj) => void;
    onTagRemoved: (obj) => void;
    onTagClick: (obj) => void;
    onTagListUpdated: () => void;
    onSelectTagColor: (obj) => void;
    options: Array<any>; // Pre-defined options to add tags
    blipTagsId: string;
    blipTagsInstance;
    shouldRenderMyself: boolean;
    placeholder: any;

    constructor(
        private $element,
        private $scope: IScope,
        $timeout: ITimeoutService,
    ) {
        super();
        this.blipTagsId = `${BLIP_TAGS_PREFIX}-${uuid.v4()}`;
        this.shouldRenderMyself = true;
        this.blipTagsInstance = new BlipTags({
            onTagAdded: this.handle.bind(this, BlipTagsCallback.OnTagAdded),
            onTagRemoved: this.handle.bind(this, BlipTagsCallback.OnTagRemoved),
            onTagClick: this.handle.bind(this, BlipTagsCallback.OnTagClick),
            onSelectTagColor: this.handle.bind(
                this,
                BlipTagsCallback.OnSelectTagColor,
            ),
            canAddOptions: this.canAddOptions,
            promptTextCreator: this.promptTextCreator,
            placeholder: this.placeholder,
            toggleTagsMode: this.toggleTagsMode,
            canRemoveTags: this.canRemoveTags,
            canChangeBackground: this.canChangeBackground,
            mode: this.mode,
        });

        /**
         * At the first time, its necessary to set canChangeBackground property as false,
         * because on add a new tag, the background options container is showed, and user
         * can refresh the page, leaving the background options container opened util color setted
         */
        $timeout(() => {
            this.model = this.model
                ? this.model.map(removeBackgroundOptions)
                : undefined;
        }, 1000);
    }

    $onInit() {
        const tagsElement = this.blipTagsInstance.render({
            options: this.options,
        });

        this.$element[0].appendChild(tagsElement);

        this.$scope.$watch('$ctrl.model', (newModel) => {
            if (this.shouldRenderMyself) {
                if (this.onTagListUpdated) {
                    this.onTagListUpdated();
                }

                this.blipTagsInstance.render({
                    tags: newModel,
                });
            }
        });
    }

    //
    $onChanges(changesObj: IOnChangesObject) {
        if (
            changesObj.options &&
            !changesObj.options.isFirstChange() &&
            this.shouldRenderMyself
        ) {
            this.blipTagsInstance.render({
                options: this.options,
            });
        } else {
            this.blipTagsInstance.blipSelectInstance.configOptions.disabled = true;
            this.blipTagsInstance.tagsOptions.canAddOptions = changesObj.canAddOptions.currentValue;
            this.blipTagsInstance.tagsOptions.canRemoveTags = changesObj.canRemoveTags.currentValue;
        }
    }

    handle(type: BlipTagsCallback, emitter) {
        this.updateModel(false);

        switch (type) {
            case BlipTagsCallback.OnTagAdded:
                this.handleOnTagAdded(emitter);
                break;
            case BlipTagsCallback.OnTagRemoved:
                this.handleOnTagRemoved(emitter);
                break;
            case BlipTagsCallback.OnSelectTagColor:
                this.handleOnSelectTagColor(emitter);
                break;
            case BlipTagsCallback.OnTagClick:
                this.handleOnTagClick(emitter);
        }
    }

    handleOnSelectTagColor({ $event }) {
        if (this.onSelectTagColor) {
            this.onSelectTagColor(EventEmitter({ ...$event }));
        }
    }

    handleOnTagAdded({ $event }) {
        if (this.onTagAdded) {
            this.onTagAdded(EventEmitter({ ...$event }));
        }
    }

    handleOnTagClick({ $event }) {
        if (this.onTagClick) {
            this.onTagClick(EventEmitter({ ...$event }));
        }
    }

    handleOnTagRemoved({ $event }) {
        if (this.onTagRemoved) {
            this.onTagRemoved(EventEmitter({ ...$event }));
        }
    }

    updateModel(shouldRenderMyself: boolean) {
        this.shouldRenderMyself = shouldRenderMyself;
        this.model = this.blipTagsInstance.props.tags;
        this.shouldRenderMyself = true;
    }
}

export const BlipTagsComponent = angular
    .module('blipComponents.blipTags', [])
    .component('blipTags', {
        template: '<div id="{{$ctrl.blipTagsId}} class="blip-tags"></div>',
        controller: BlipTagsController,
        controllerAs: '$ctrl',
        bindings: {
            canAddOptions: '<?',
            promptTextCreator: '@?',
            placeholder: '@?',
            options: '<?',
            canRemoveTags: '<?',
            canChangeBackground: '<?',
            onTagAdded: '&?',
            onTagRemoved: '&?',
            onTagClick: '&?',
            onSelectTagColor: '&?',
            onTagListUpdated: '&?',
            mode: '@?',
            toggleTagsMode: '<?',
        },
        require: {
            ngModel: 'ngModel',
        },
    })
    .name;

import angular from 'core/angular';
import template from './ThreadMessagesView.html';
import { debounce } from 'data/function';
import { EventEmitter } from 'shared/EventEmitter';
import { IComponentController, IOnChangesObject } from 'angular';

class ThreadMessages implements IComponentController {
    private scrollToBottom: boolean;
    private scrollToBottomTimeout: any;
    private scrollTimeout: any;
    private isLoadingThread: boolean = true; //True so placeholder appears first
    private debouncedScroll: any;
    loadMore: (obj: any) => void;
    wrapper: HTMLDivElement;
    constructor(
        private $element
    ) {
        this.wrapper = this.$element[0].querySelector(
            '#thread-wrapper',
        ) as HTMLDivElement;
    }

    $onChanges(changesObj: IOnChangesObject) {
        const { messages } = changesObj;

        if (messages && this.wrapper) {
            const scrollDiff = Math.abs(
                (this.wrapper.scrollTop + this.wrapper.clientHeight) - this.wrapper.scrollHeight
            );
            const isChangedAndNearBottom = scrollDiff < this.wrapper.clientHeight;

            if (!messages.isFirstChange() && isChangedAndNearBottom) {
                this.scrollToBottomTimeout = setTimeout(() => this.scrollViewToBottom());
            }
        }
    }

    $onInit() {
        this.scrollTimeout = setTimeout(() => {
            const scroll = async (event) => {
                if (event.srcElement.scrollTop === 0) {
                    if (this.loadMore) {
                        this.loadMore(EventEmitter({ wrapper: this.wrapper }));
                    }
                }
            };
            this.debouncedScroll = debounce(scroll);
            this.wrapper.addEventListener('scroll', this.debouncedScroll);
        });
    }

    $onDestroy() {
        if (this.scrollToBottomTimeout) {
            clearTimeout(this.scrollToBottomTimeout);
        }

        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }

        this.wrapper.removeEventListener(
            'scroll',
            this.debouncedScroll,
        );
    }

    scrollViewToBottom() {
        if (this.scrollToBottom) {
            this.wrapper.scrollTop = this.wrapper.scrollHeight;
        }
    }
}

export const ThreadMessagesComponent = angular
    .module('blipComponents.threadMessages', [])
    .component('threadMessages', {
        template,
        controller: ThreadMessages,
        controllerAs: '$ctrl',
        bindings: {
            messages: '<',
            loadMore: '&',
            scrollToBottom: '<',
            isLoadingThread: '<'
        },
    })
    .name;

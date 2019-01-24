import './localLoading.scss';
import template from './LocalLoadingView.html';
import { Component } from 'decorators';
/**
 *Component to show a local loading. Add the component to the same level of elements you want to cover with loading.
 */
@Component({
    selector: 'localLoading',
    template,
})
export class LocalLoadingComponent {
    constructor() {}
}

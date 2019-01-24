/**
 * Simple confirmation modal to be used alongside ModalService, e.g.:
 *
 * ModalService.showModal(ConfirmationModal({
 *    title: {
 *      text: 'Confirm something',
 *      class: 'text-delete',
 *    body: `
 *    <p>Do you really want to do this?</p>
 *    `,
 *    buttons: {
 *        cancel: {
 *          text: 'No',
 *        },
 *        confirm: {
 *          text: 'Yes',
 *          class: 'delete',
 *        },
 *    },
 * }));
 */

import template from './ConfirmationModalView.html';
import controller from './ConfirmationModalController';

export default (params) => {
    return {
        template,
        controller,
        controllerAs: '$ctrl',
        ...params,
        inputs: {
            ...params.inputs,
            title: params.title || { text: '' },
            body: params.body || '',
            buttons: params.buttons || {},
            size: params.size || 'sm',
        },
    };
};

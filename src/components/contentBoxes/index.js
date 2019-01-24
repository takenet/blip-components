import controller from './ContentBoxesController';
import template from './ContentBoxesView.html';
import './ContentBoxes.scss';

export default {
    controller,
    template,
    bindings: {
        ngModel: '<',
        maxDepth: '<',
        childLevelItems: '<?',
        onSave: '&',
        blankMenuError: '&?',
    },
};

import './iconButton.scss';

export default {
    template: `
    <button class="{{$ctrl.iconClass}} text-{{$ctrl.color}} {{$ctrl.btnSize}}" ng-disabled="$ctrl.disabled">
        <icon-dpr size="{{$ctrl.size}}" round="{{$ctrl.round}}"><span ng-transclude></span></icon-dpr>
    </button>
    `,
    controller: function() {
        'ngInject';
        this.color = this.color || 'disabled';
    },
    controllerAs: '$ctrl',
    transclude: true,
    bindings: {
        color: '@',
        size: '@',
        btnSize: '@',
        round: '@',
        iconClass: '@',
        disabled: '=?',
    },
};

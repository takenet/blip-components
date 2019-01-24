export const LoadingIconComponent = {
    template: `
    <div class="sk-circle" style="{{$ctrl.styles}}">
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    </div>
    `,
    controllerAs: '$ctrl',
    controller: class {
        styles: any;
        width: string;
        height: string;
        icon: boolean;

        constructor() {
            const props = {
                width: this.width,
                height: this.height,
                [this.icon ? 'margin' : '']: 'auto'
            };

            this.styles = Object.keys(props).reduce((acc, x) => acc += `${x}: ${props[x]};`, '');
        }
    },
    bindings: {
        width: '@?',
        height: '@?',
        icon: '<?',
    }
};

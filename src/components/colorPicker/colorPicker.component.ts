import './colorPicker.scss';
import * as angular from 'angular';
import { Context } from 'vm';
import { RenderContext } from 'vue/types/options';

export class ColorPickerComponent {
    colorBlock: HTMLCanvasElement;
    colorStrip: HTMLCanvasElement;
    colorButton: HTMLSpanElement;

    drag: boolean;
    validColor: boolean;
    showPicker: boolean = false;
    rgbaColor: string;
    inputColor: string;
    ctx1: CanvasRenderingContext2D;
    ctx2: CanvasRenderingContext2D;
    id: string;

    constructor(
        private $timeout,
        private $element,
        private $scope,
        private $rootScope,
    ) {}

    $onInit(): void {
        this.colorButton = this.$element[0].querySelector(
            '.color-label',
        ) as HTMLSpanElement;
        this.colorBlock = this.$element[0].querySelector(
            '.color-block',
        ) as HTMLCanvasElement;
        this.ctx1 = this.colorBlock.getContext('2d');
        let width1 = this.colorBlock.width;
        let height1 = this.colorBlock.height;

        this.colorStrip = this.$element[0].querySelector(
            '.color-strip',
        ) as HTMLCanvasElement;
        this.ctx2 = this.colorStrip.getContext('2d');
        let width2 = this.colorStrip.width;
        let height2 = this.colorStrip.height;

        let x = 0;
        let y = 0;
        let drag = false;
        let validColor = false;
        let rgbaColor = 'rgba(255,0,0,1)';

        this.ctx1.rect(0, 0, width1, height1);
        this.fillGradient();

        this.ctx2.rect(0, 0, width2, height2);
        let grd1 = this.ctx2.createLinearGradient(0, 0, 0, height1);
        grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
        grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
        this.ctx2.fillStyle = grd1;
        this.ctx2.fill();
        this.colorStrip.addEventListener('click', this.click, false);

        this.colorBlock.addEventListener('mousedown', this.mousedown, false);
        this.colorBlock.addEventListener('mouseup', this.mouseup, false);
        this.colorBlock.addEventListener('mousemove', this.mousemove, false);

        this.$scope.$watch('$ctrl.inputColor', (newValue, oldValue) => {
            this.hexToRgbA();
        });

        this.setToggleListener();
    }

    setToggleListener() {
        this.$rootScope.$on('toggleColorPicker', (event, data) => {
            if (data !== this.id && this.showPicker) {
                this.$timeout(() => {
                    this.showPicker = !this.showPicker;
                }, 0);
            }
        });
    }

    fillGradient() {
        let width1 = this.colorBlock.width;
        let height1 = this.colorBlock.height;

        let width2 = this.colorStrip.width;
        let height2 = this.colorStrip.height;
        this.ctx1.fillStyle = this.rgbaColor;
        this.ctx1.fillRect(0, 0, width1, height1);

        let grdWhite = this.ctx2.createLinearGradient(0, 0, width1, 0);
        grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
        grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
        this.ctx1.fillStyle = grdWhite;
        this.ctx1.fillRect(0, 0, width1, height1);

        let grdBlack = this.ctx2.createLinearGradient(0, 0, 0, height1);
        grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
        grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
        this.ctx1.fillStyle = grdBlack;
        this.ctx1.fillRect(0, 0, width1, height1);
    }

    mousedown = (e) => {
        this.drag = true;
        this.changeColor(e);
    }

    mousemove = (e) => {
        if (this.drag) {
            this.changeColor(e);
        }
    }

    mouseup = (e) => {
        this.drag = false;
    }

    click = (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        const imageData = this.ctx2.getImageData(x, y, 1, 1).data;
        this.rgbaColor =
            'rgba(' +
            imageData[0] +
            ',' +
            imageData[1] +
            ',' +
            imageData[2] +
            ',1)';
        this.fillGradient();
    }

    changeColor(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        let imageData = this.ctx1.getImageData(x, y, 1, 1).data;
        this.rgbaColor =
            'rgba(' +
            imageData[0] +
            ',' +
            imageData[1] +
            ',' +
            imageData[2] +
            ',1)';
        this.rgb2hex(this.rgbaColor);
        this.colorButton.style.backgroundColor = this.rgbaColor;
    }

    hexToRgbA() {
        let c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(this.inputColor)) {
            c = this.inputColor.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            const rgbaColor =
                'rgba(' +
                [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
                ',1)';
            this.colorButton.style.backgroundColor = rgbaColor;

            this.colorButton.style.backgroundColor =
                'rgba(' +
                [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
                ',1)';
            this.validColor = true;
        } else {
            this.validColor = false;
        }
    }

    rgb2hex(rgb) {
        rgb = rgb.match(
            /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i,
        );
        let hexColor =
            rgb && rgb.length === 4
                ? '#' +
                  ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
                  ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
                  ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2)
                : '';
        this.$timeout(() => {
            this.inputColor = hexColor;
        }, 0);
    }

    toggleColorPicker() {
        this.$rootScope.$broadcast('toggleColorPicker', this.id);
        this.showPicker = !this.showPicker;
    }
}

export const colorPicker = {
    controller: ColorPickerComponent,
    controllerAs: '$ctrl',
    bindings: {
        inputColor: '=',
        id: '@',
    },
    template: `
    <div class="date-picker-wrapper">
        <span class="color-label" ng-click="$ctrl.toggleColorPicker()"></span>
        <div class="color-picker" ng-class="{'show-picker': $ctrl.showPicker }">
            <div class="canvas-wrapper">
                <canvas class="color-canvas color-block" height="150" width="150"></canvas>
                <canvas class="color-canvas color-strip" height="150" width="30"></canvas>
            </div>
            <input type="text" maxlenght="7" placeholder="Hex Code" class="color-text-input" ng-model="$ctrl.inputColor" ng-class="{'invalid-input': !$ctrl.validColor }"></input>
        </div>
     </div>`,
};

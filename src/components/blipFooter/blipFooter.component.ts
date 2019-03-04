import './blipFooter.scss';
import { Component } from 'decorators';
import { IComponentController } from 'angular';

@Component({
    template: `
    <footer class="w-100 {{$ctrl.areaClass}}">
        <div class="w-100 tc">
            <span class="bp-c-city" translate-compile>&copy;{{$ctrl.copyrightYear}}, BLiP {{'footer.copyRight' | translate}} |</span><span class="pl1" translate="footer.terms" translate-compile></span>
        </div>
    </footer>`,
    bindings: {
        areaClass: '@?',
    }
})
export class BlipFooterComponent implements IComponentController {
    copyrightYear: number;

    $onInit() {
        this.copyrightYear = new Date().getFullYear();
    }
}

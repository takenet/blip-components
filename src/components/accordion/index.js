import angular from "core/angular";
import "./Accordion.scss";
class AccordionComponentController {
    imageuri;
    showimage;
    ischecked;

    onFailure() {
        this.imageuri = undefined;
        this.showimage = undefined;
        this.ischecked = true;
    }
}

export const accordion = angular
    .module("blipComponents.accordion", [])
    .component("accordion", {
        template: `
        <article class="accordion relative">
            <input class="accordion-checkbox" type="checkbox" ng-checked="$ctrl.ischecked" />
            <i class="accordion-chevron fr"></i>
            <img ng-if="$ctrl.showimage" class="accordion-image icon icon-avatar w2 h2 round small" ng-src="{{$ctrl.imageuri}}" />
            <h4 class="accordion-title ma0 ttu" ng-bind="$ctrl.title"></h4>
            <div class="accordion-content relative overflow-hidden" ng-transclude></div>
        </article>
        `,
        controller: AccordionComponentController,
        controllerAs: "$ctrl",
        transclude: true,
        bindings: {
            title: "@",
            imageuri: "<",
            showimage: "<",
            ischecked: "<"
        }
    }).name;

import angular from "core/angular";
import template from './AccordionView.html';
import "./Accordion.scss";
class AccordionComponentController {
    imageuri;
    showimage;
    ischecked;
    item;

    onFailure() {
        this.imageuri = undefined;
        this.showimage = undefined;
        this.ischecked = true;
        this.item = undefined;
    }
}

export const accordion = angular
    .module("blipComponents.accordion", [])
    .component("accordion", {
        template,
        controller: AccordionComponentController,
        controllerAs: "$ctrl",
        transclude: true,
        bindings: {
            title: "@",
            item: "<",
            imageuri: "<",
            showimage: "<",
            ischecked: "<"
        }
    }).name;

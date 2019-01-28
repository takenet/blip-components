type ComponentProps = {
    controllerAs?: string,
    template: string,
    selector?: string,
    transclude?: boolean,
    bindings?: Object,
    inputs?: string[],
    outputs?: string[],
};

export const Component = (properties: ComponentProps) => (target) => {
    target.prototype.controller = target;
    target.prototype.bindings = {};
    target.prototype = {
        ...target.prototype,
        ...properties,
        controllerAs: properties.controllerAs || '$ctrl'
    };

    //Bindins with <? type
    if (properties.inputs) {
        properties.inputs.forEach((element) => {
            target.prototype.bindings[element] = '<?';
        });
    }

    //Bindins with &? type
    if (properties.outputs) {
        properties.outputs.forEach((element) => {
            target.prototype.bindings[element] = '&?';
        });
    }

    return target.prototype;
};

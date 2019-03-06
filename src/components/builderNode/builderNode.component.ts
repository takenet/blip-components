import angular from 'core/angular';
import BuilderNodeView from './BuilderNodeView.html';
import './builderNode.scss';

declare let jsPlumb: any;
class BuilderNode {
    defaultTitle: string;
    node: any;
    onEdit: (obj: any) => {};
    onDelete: (obj: any) => {};
    onDuplicate: (obj: any) => {};
    onCopyNodeId: (obj: any) => {};
    onUpdateElement: (obj: any) => {};
    builderInstance: any;

    constructor(private $translate, private $timeout) {
        this.defaultTitle = this.$translate.instant(
            'builder.node.defaultTitle',
        );
    }

    get _viewTitle() {
        if (this.node.$title == '' || this.node.$title == undefined) {
            return this.defaultTitle;
        }

        return this.node.$title;
    }

    $onEdit($node) {
        this.onEdit({ $node });
    }

    $onDelete($node) {
        this.onDelete({ $node });
    }

    $onDuplicate($node) {
        this.onDuplicate({ $node });
    }

    $onCopyNodeId($node) {
        this.onCopyNodeId({ $node });
    }

    $onUpdateElement($node) {
        this.$timeout(() => {
            this.onUpdateElement({ $node });
        }, 600); // Necessary due to tags animation delay
    }
}

export const BuilderNodeComponent = angular
    .module('blipComponents.builderNode', [])
    .component('builderNode', {
        controller: BuilderNode,
        controllerAs: '$ctrl',
        template: BuilderNodeView,
        bindings: {
            node: '<',
            onEdit: '&?',
            onDelete: '&?',
            onDuplicate: '&?',
            onCopyNodeId: '&?',
            onUpdateElement: '&?',
        },
    })
    .name;

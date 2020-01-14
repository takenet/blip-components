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
    nodeTitle: string;

    constructor(private $translate, private $timeout) {
        this.defaultTitle = 'default';
    }

    get _viewTitle() {
        if (this.nodeTitle == '' || this.nodeTitle == undefined) {
            return this.defaultTitle;
        }

        return this.nodeTitle;
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
            this.onUpdateElement && this.onUpdateElement({ $node });
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
            nodeId: '@',
            nodeTitle: '@',
            nodeTags: '<',
            onEdit: '&?',
            onDelete: '&?',
            onDuplicate: '&?',
            onCopyNodeId: '&?',
            onUpdateElement: '&?',
        },
    })
    .name;

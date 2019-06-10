import './analysisInfo.scss';
import angular from 'core/angular';
import template from './analysisInfoView.html';
import { ComponentController } from '../base/ComponentController';
import { IRootElementService } from 'angular';

const HIGHLIGHT_START = '<span class="highlight">';
const HIGHLIGHT_END = '</span>';

class AnalysisInfoController extends ComponentController {

    private analysisResult: Analysis;

    public entities: Entity[];
    public intentions: Intention[];
    public analysis: { id: string, content: string, promise: Promise<Analysis> };
    public selectedIntention: string;
    public structuredEntities: { [id: string]: string[] } = {};
    public structuredIntents: { label: string, value: string }[];
    public displayEntityContent: boolean = false;
    public displayHiddencontent: boolean = false;

    public messageCardContent: any = {
        document: {
            type: 'text/plain',
            content: this.analysis.content,
        },
        position: 'right'
    };

    public onEntityToggle: (toggle: object) => void;
    public onError: (id: object) => void;
    public onIntentFocus: () => void;
    public onIntentBlur: () => void;

    constructor(
        private $element: IRootElementService
    ) {
        super();
    }

    async $onInit() {

        this.scrollTo();

        try  {

            this.analysisResult = await this.analysis.promise;
            this.displayEntityContent = this.analysisResult.entities.length > 0;

            // Maps intentions to BLiP select format
            this.structuredIntents = this.analysisResult.intentions
            .sort((a, b) => b.score - a.score)
            .map(i => {
                const intention = this.intentions.find(inte => inte.id === i.id);
                const score = i.score.toFixed(2);

                i.name = intention ? intention.name : i.id;

                return {
                    value: i.id,
                    label: `${i.name} (${score})`
                };
            });

            this.selectedIntention = this.structuredIntents[0].value;

            // Get distinct objects by value
            this.analysisResult.entities = Array.from(new Set(this.analysisResult.entities.map(e => e.value)))
            .map(value => {
                const entity = this.analysisResult.entities.find(e => e.value === value);
                return {
                    id: entity.id,
                    value: entity.value,
                    name: entity.name
                };
            });

            // Group entities by name
            this.analysisResult.entities = this.analysisResult.entities
            .map(e => {

                let entity = this.entities.find(en => en.id === e.id);
                e.name = entity.name;

                let list = this.structuredEntities[e.name];

                if (list) {
                    list.push(e.value);
                } else {
                    list = [e.value];
                }

                this.structuredEntities[e.name] = list;

                return e;

            });

            this.scrollTo();

        }  catch  {
            this.onError({ $id: this.analysis.id });
        }

    }

    toggleContent() {
        this.displayHiddencontent = !this.displayHiddencontent;
        this.onEntityToggle({ $toggle: this.displayHiddencontent });
    }

    highlightEntities() {

        let content = this.analysis.content;

        const highlightMatches = (matches: RegExpMatchArray ) => {
            if (matches) {
                const wordLenght = matches[0].length;
                const matchContent = content.slice(matches.index, matches.index + wordLenght);
                const before = content.slice(0, matches.index);
                const after = content.slice(matches.index + wordLenght);
                content = `${before}${HIGHLIGHT_START}${matchContent}${HIGHLIGHT_END}${after}`;
            }
        };

        this.analysisResult.entities
        .forEach(e => {

            let entity = this.entities.find(en => en.id === e.id);

            entity.values
            .forEach(en => en.synonymous.forEach(syn => {
                highlightMatches(
                    content.toLowerCase().match(syn));
            }));

        });

        this.messageCardContent = undefined;
        setTimeout(() => {
            this.messageCardContent = {
                document: {
                    type: 'text/plain',
                    content: content,
                },
                position: 'right'
            };
        }, 0);

    }

    scrollTo() {
        this.$element[0].scrollIntoView({
            behavior: 'smooth',
        });
    }

}

export const AnalysisInfoComponent = angular
    .module('blipComponents.analysisInfo', [])
    .component('analysisInfo', {
        controller: AnalysisInfoController,
        controllerAs: '$ctrl',
        bindings: {
            entities: '<',
            intentions: '<',
            analysis: '<',
            onEntityToggle: '&?',
            onIntentFocus: '&?',
            onIntentBlur: '&?',
            onError: '&?',
        },
        template,
    })
    .name;

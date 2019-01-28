import { IComponentController } from 'angular';
import { EventEmitter } from 'shared/EventEmitter';

export const LOAD_EDITOR = 'LOAD_EDITOR';
interface IMonacoEditorComponentBindings extends IComponentController {
    width?: string;
    height?: string;
    language?: string;
    theme?: string;
    code?: string;
    onDidCreateEditor?: (obj: any) => void;
}

/**
 * Component that build monaco editor element
 *
 * @param {string} width - Container width
 * @param {string} height - Container height
 * @param {string} language - Editor language
 * @param {string} theme - Editor theme (vs, vs-dark or hc-black)
 * @param {any} code - Editor content code
 * @param {function} onDidCreateEditor - Event dispatched after editor created
 */
class MonacoEditor implements IMonacoEditorComponentBindings {
    onSave: (obj: any) => void;
    onDidCreateEditor: (obj: any) => void;
    onCodeChange: (obj: any) => void;
    handleCodeChanges: any;
    height: string;
    width: string;
    code: any;
    theme: string;
    language: string;
    editor: any;
    handleOnDidCreateEditor: any;
    lazyLoad: any;
    hasEditor: boolean = false;
    dynamicCode: boolean;

    constructor(private $scope, private $timeout) {}

    get containerWidth(): string {
        return this.width || '500px';
    }

    get containerHeight(): string {
        return this.height || '500px';
    }

    $onChanges(changes) {
        if (changes.code && changes.code.currentValue) {
            this.$timeout(() => {
                this.editor && this.editor.setValue(changes.code.currentValue);
            });
        }
    }

    async initEditor() {
        try {
            const monaco = await import(/* webpackChunkName: "monaco-editor" */
            'monaco-editor');
            if (this.onDidCreateEditor) {
                this.handleOnDidCreateEditor = monaco.editor.onDidCreateEditor(
                    (editor) => {
                        this.onDidCreateEditor(EventEmitter({ editor }));
                    },
                );
            }

            this.editor = monaco.editor.create(
                document.getElementById('monaco-editor-container'),
                {
                    value: this.code,
                    language: this.language,
                    theme: this.theme || 'vs-dark',
                    fontLigatures: true,
                },
            );

            this.addEditorActions(monaco);

            if (this.onCodeChange) {
                this.handleCodeChanges = this.editor.onDidChangeModelContent(
                    (event) => {
                        this.onCodeChange(
                            EventEmitter({
                                code: this.editor.getValue(),
                                event,
                            }),
                        );
                    },
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    async $onInit(): Promise<any> {
        if (!this.lazyLoad) {
            await this.initEditor();
        } else {
            this.$scope.$on(LOAD_EDITOR, async () => {
                if (!this.hasEditor) {
                    this.$timeout(async () => {
                        await this.initEditor();
                        this.hasEditor = true;
                    });
                }
            });
        }
    }

    addEditorActions(monaco): void {
        // Ctrl+S action dispatch onSave event
        this.editor.addAction({
            id: 'save-action',
            label: 'Save',
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
            precondition: undefined,
            keybindingContext: undefined,
            run: (editor) => {
                if (this.onSave) {
                    this.onSave(EventEmitter({ editor }));
                }
            },
        });
    }

    $onDestroy(): void {
        this.handleOnDidCreateEditor && this.handleOnDidCreateEditor.dispose();
        this.handleCodeChanges && this.handleCodeChanges.dispose();
        this.editor && this.editor.dispose();
    }
}

export const MonacoEditorComponent = {
    template: `
        <div id="monaco-editor-container"
            ng-style="{ width: $ctrl.containerWidth, height: $ctrl.containerHeight }"
            ></div>
    `,
    controller: MonacoEditor,
    controllerAs: '$ctrl',
    bindings: {
        width: '@?',
        height: '@?',
        language: '@?',
        theme: '@?',
        code: '@?',
        lazyLoad: '<?',
        onDidCreateEditor: '&?',
        onCodeChange: '&?',
        onSave: '&?',
    },
    transclude: false,
};

export class TextEditorController {
    public close: any;
    public error: boolean;
    private _source: string;

    constructor(close, source: string, private syntax: SourceSyntax) {
        this.close = close;
        this.source = source;
    }

    confirm = () => this.close(this.source);
    cancel = () => this.close();

    set source(content: string) {
        this.error = false;
        this._source = content;

        if (this.syntax == SourceSyntax.JSON) {
            try {
                JSON.parse(content);
            } catch (e) {
                this.error = true;
            }
        }
    }

    get source() {
        return this._source;
    }
}

export enum SourceSyntax {
    Text,
    JSON,
    Javascript,
}

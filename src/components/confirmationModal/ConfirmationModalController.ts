export default class ConfirmationModalController {
    public size: string;
    public buttons: any;
    public body: string;
    public title: any;
    public _close: any;

    constructor(close, title, body, buttons, size) {
        this._close = close;

        this.title = title;
        this.body = body;
        this.buttons = buttons;
        this.size = size;
    }

    confirm() {
        this._close(true);
    }

    cancel() {
        this._close(false);
    }

    get isSingleButton() {
        return (
            (this.buttons.cancel && !this.buttons.confirm) ||
            (!this.buttons.cancel && this.buttons.confirm)
        );
    }

    get button() {
        return this.isSingleButton
            ? this.buttons.cancel || this.buttons.confirm
            : undefined;
    }
}

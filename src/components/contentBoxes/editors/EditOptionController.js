import '!ng-cache-loader!./EditOptionBoxView.html';
import '!ng-cache-loader!./EditOptionLinkView.html';
import '!ng-cache-loader!./EditOptionDestinyView.html';

export default class {
    constructor(close, option, modalType) {
        this.close = close;
        this.option = option;
        this._modalType = modalType;
        this.modalSettings = {};

        this.init();
    }

    init() {
        //Create a deep copy from option
        this.editOptionModel = JSON.parse(JSON.stringify(this.option));

        switch (this._modalType) {
            case 'box':
                this.modalSettings.template = 'EditOptionBoxView.html';
                break;
            case 'link':
                this.modalSettings.template = 'EditOptionLinkView.html';
                break;
            default:
                this.modalSettings.template = 'EditOptionDestinyView.html';
                break;
        }
    }

    save() {
        Object.keys(this.editOptionModel).forEach((key) => {
            this.option[key] = this.editOptionModel[key];
        });

        this.close(true);
    }
}

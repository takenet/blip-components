class JsonContent {

    constructor() {
        this.restrict = '';
    }

    static factory() {
        'ngInject';
        return new JsonContent();
    }

    compile() {
        return this.link.bind(this);
    }

    link(scope, element) {
        let el = element[0];

        el.addEventListener('keyup', () => {
            el.classList.remove('input-error');
            try {
                JSON.parse(el.value);
            }
            catch (e) {
                el.classList.add('input-error');
            }
        });
    }
}

export default JsonContent;

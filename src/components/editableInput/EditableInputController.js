const isEmptyString = text => !text || text.trim() === '';

export default class {
    constructor() { }

    editItem({ id, value }) {
        if (this.editingItem && this.editingItem !== id)
            this.finishEditItem(this.editingItem);

        if (!this.editingItem || this.editingItem.id !== id)
            this.editingItem = { id, value };

        this.$timeout(() => {
            let inputItem = document.getElementById(`input-item-${this.editingItem.id}`);
            inputItem.focus();
        });
    }

    finishEditItem({ id, value }) {
        if (isEmptyString(value))
            return;

        const oldItems = this.items;
        value = value.trim().slice(0, this.length || value.length);
        this.items = this.items.map(item => item.id === id ? { id, value } : item);

        this.editingItem = undefined;

        if (oldItems.some(item => item.id === id && item.value !== value))
            this._updateModel();
    }
}

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const itemElement = this._renderer(item);
      this.addItem(itemElement);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

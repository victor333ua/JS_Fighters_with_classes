import {View} from "../views/View";

export class Modal extends View {

    constructor() {
       super();
    }

    showModal({title, bodyElement}) {
        const root = this.getModalContainer();
        const modal = this.createModal(title, bodyElement);

        root.append(modal);
    }

    getModalContainer() {
        return document.getElementById('root');
    }

    createModal(title, bodyElement) {
        const layer = this.createElement({tagName: 'div', className: 'modal-layer'});
        const modalContainer = this.createElement({tagName: 'div', className: 'modal-root'});
        const header = this.createHeader(title);

        modalContainer.append(header, bodyElement);
        layer.append(modalContainer);

        return layer;
    }

    createHeader(title) {
        const headerElement = this.createElement({tagName: 'div', className: 'modal-header'});
        const titleElement = this.createElement({tagName: 'span'});
        const closeButton = this.createElement({tagName: 'div', className: 'close-btn'});

        titleElement.innerText = title;
        closeButton.innerText = '×';
        closeButton.addEventListener('click', this.hideModal);
        headerElement.append(title, closeButton);

        return headerElement;
    }

    hideModal(event) {
        const modal = document.getElementsByClassName('modal-layer')[0];
        modal.remove();
    }
}
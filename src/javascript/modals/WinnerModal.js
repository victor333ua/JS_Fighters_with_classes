import {Modal} from "./Modal";

export class WinnerModal extends Modal {

    showWinnerModal(fighter) {
        // show winner name and image

        const title = 'Winner';
        const bodyElement = this.createBody(fighter);
        this.showModal({ title, bodyElement });
    }

    createBody(fighter) {
        const {source, name} = fighter;

        const body = this.createElement({tagName: 'div', className: 'modal-body'});

        const textElement = this.createElement({tagName: 'span', className: 'modal-text'});
        textElement.innerText = `name : ${name}`;

        const imageElement = this.createImage(source);
        imageElement.style.height = '270px';

        body.append(imageElement, textElement);

        return body;
    }
}
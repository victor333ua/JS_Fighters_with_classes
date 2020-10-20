import {Modal} from "./Modal";

export class FighterDetailsModal extends Modal {

    showFighterDetailsModal(fighter) {
        const title = 'Fighter info';
        const bodyElement = this.createFighterDetails(fighter);
        this.showModal({title, bodyElement});
    }

    createFighterDetails(fighter) {
        const {source} = fighter;

        const fTextElement = (name, ext) => value => {
            const textElement = this.createElement({tagName: 'span', className: 'modal-text'});
            textElement.innerText = `${name} : ${value} ${ext}`;
            return textElement;
        }

        const schema = {
            name:    fTextElement('name', ''),
            health:  fTextElement('health', 'hp'),
            attack:  fTextElement('attack', 'pow'),
            defense: fTextElement('defense', 'def')
        }

        const fighterDetails = this.createElement({tagName: 'div', className: 'modal-body'});

        // show fighter name, attack, defense, health, image
        const arrTextElements =
            Object.entries(schema).map(([key, fCreateElement]) => fCreateElement(fighter[key]));

        const imageElement = this.createImage(source);
        imageElement.style.height = '270px';

        fighterDetails.append(imageElement, ...arrTextElements);

        return fighterDetails;
    }
}
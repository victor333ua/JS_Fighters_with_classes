export class View {

    element;

    createElement({ tagName, className, attributes = {} }) {
        const element = document.createElement(tagName);

        if (className) {
            element.classList.add(className);
        }

        Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

        return element;
    }

    createName(name) {
        const nameElement = this.createElement({ tagName: 'span', className: 'name' });
        nameElement.innerText = name;

        return nameElement;
    }

    createImage(source) {
        const attributes = { src: source };
        const imgElement = this.createElement({ tagName: 'img', className: 'fighter-image', attributes });

        return imgElement;
    }

    createCheckbox() {
        const label = this.createElement({ tagName: 'label', className: 'custom-checkbox' });
        const span = this.createElement({ tagName: 'span', className: 'checkmark' });
        const attributes = { type: 'checkbox' };
        const checkboxElement = this.createElement({ tagName: 'input', attributes });

        label.append(checkboxElement, span);
        return label;
    }
}
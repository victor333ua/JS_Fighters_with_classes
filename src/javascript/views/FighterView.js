import {View} from "./View";

export class FighterView extends View {

    constructor(fighter, handleClick, selectFighter) {
        super();
        this.createFighter(fighter, handleClick, selectFighter);
    }

    createFighter(fighter, handleClick, selectFighter) {
        const { name, source } = fighter;
        const nameElement = this.createName(name);
        const imageElement = this.createImage(source);
        const checkboxElement = this.createCheckbox();

        this.element = this.createElement({ tagName: 'div', className: 'fighter' });
        this.element.append(imageElement, nameElement, checkboxElement);

        const preventCheckboxClick = (ev) => ev.stopPropagation();
        const onCheckboxClick = (ev) => selectFighter(ev, fighter);
        const onFighterClick = (ev) => handleClick(ev, fighter);

        this.element.addEventListener('click', onFighterClick, false);
        checkboxElement.addEventListener('change', onCheckboxClick, false);
        checkboxElement.addEventListener('click', preventCheckboxClick , false);
    }
}

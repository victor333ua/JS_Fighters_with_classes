import {View} from "../views/View";

export class FightWindowModal extends View {

  showFightWindow(attacker, enemy) {

    const {name: nameAttacker, source: sourceAttacker, health: healthAttacker} = attacker;
    const {name: nameEnemy, source: sourceEnemy, health: healthEnemy} = enemy;

    const fightRoot = this.createElement({tagName: 'div', className: 'fight-root'});
    const fightContainer = this.createElement({tagName: 'div', className: 'fight-container'});

    const imageLeft = this.createImage(sourceAttacker, 'left');
    const imageRight = this.createImage(sourceEnemy, 'right');
    const fighterRight = this.createElement({tagName: 'div', className: 'fight-right'});
    fighterRight.append(imageRight);

    const gapElement = this.createElement({tagName: 'div', className: 'gap'});

    fightContainer.append(imageLeft, gapElement, fighterRight);

    const fightResults = this.createElement({tagName: 'div', className: 'fight-results'});
    const leftPane = this.createSidePane('Fighter', [nameAttacker, nameEnemy], false);
    const rightPane = this.createSidePane('Health', ['idHealth1', 'idHealth2'], true);
    fightResults.append(leftPane, rightPane);

    fightRoot.append(fightContainer, fightResults);
    document.getElementById('root').append(fightRoot);

    this.setHealth(healthAttacker, true);
    this.setHealth(healthEnemy, false);
  }

  createImage(source, id) {
    const attributes = {src: source, id: id};
    const imgElement = this.createElement({tagName: 'img', className: 'fight-source', attributes});
    return imgElement;
  }

  createSidePane(name, arr = [], isRightPane) {
    const root = this.createElement({tagName: 'div', className: 'side-results'});
    const header = this.createElement({tagName: 'p', className: 'header-results'});
    header.innerText = name;
    root.append(header);

    for (let nameOrId of arr) {
      let elem = this.createElement({tagName: 'p', className: 'text-results'});
      isRightPane ?
          elem.id = nameOrId : elem.innerText = nameOrId;
      root.append(elem);
    }
    return root;
  }

  setHealth(health, isOne) {
    const id = isOne ? 'idHealth1' : 'idHealth2';
    document.getElementById(id).innerText = health;
  }
}
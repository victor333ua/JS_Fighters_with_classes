import {FightWindowModal} from "./modals/FightWindowModal";

export class Fight {
    constructor() {
        this.fightWindow = new FightWindowModal();
    }

    async battle(firstFighter, secondFighter) {
        // return winner

        /*
          let obj = { attacker: firstFighter, enemy: secondFighter};
          let newObj = JSON.parse(JSON.stringify(obj));
          let { attacker, enemy } = {...newObj };
        */
        let attacker = {...firstFighter};
        let enemy = {...secondFighter};

        let damage;

        this.fightWindow.showFightWindow(attacker, enemy);

        const {gap: gapElement, left: imageLeft, right: imageRight} = this.getElementsToFight();

        let isEnemyLeft = false;
        let xTranslate = parseInt(getComputedStyle(gapElement).width, 10);
        const delta = xTranslate / 3;
        xTranslate += delta;
        const transition = `translateX(${xTranslate + delta}px)`;

        while (true) {
            damage = this.getDamage(attacker, enemy);
            enemy.health -= damage;

            if (isEnemyLeft) {
                imageRight.style.transform = transition;
                imageRight.style.webkitTransform = transition;
            } else {
                imageLeft.style.transform = transition;
                imageLeft.style.webkitTransform = transition;
            }

            await this.delay();
            this.fightWindow.setHealth(Math.round(enemy.health), isEnemyLeft);

            if (isEnemyLeft) {
                imageRight.style.transform = `none`;
                imageRight.style.webkitTransform = `none`;
            } else {
                imageLeft.style.transform = `none`;
                imageLeft.style.webkitTransform = `none`;
            }

            await this.delay();

//    return new Promise(resolve => {setTimeout(() => resolve(attacker), 10000)});

            if (enemy.health < 0) return isEnemyLeft ? secondFighter : firstFighter;
            [attacker, enemy] = [enemy, attacker];
            isEnemyLeft = !isEnemyLeft;
        }
    }

    async delay() {
        const DELAY = 2000;

        return new Promise(resolve => {
            setTimeout(() => resolve(), DELAY)
        });
    }

    getDamage(attacker, enemy) {
        return Math.max(this.getHitPower(attacker) - this.getBlockPower(enemy), 0);
    }

    getHitPower(fighter) {
        return this.getRandom() * fighter.attack;
    }

    getBlockPower(fighter) {
        return this.getRandom() * fighter.defense;
    }

    getRandom() {
        return (1 + Math.random());
    }

    getElementsToFight() {
        return {
            left: document.getElementById('left'),
            gap: document.getElementsByClassName('gap')[0],
            right: document.getElementById('right')
        };
    }
}
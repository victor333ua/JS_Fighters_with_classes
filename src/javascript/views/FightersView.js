import {View} from "./View";
import {FighterView} from "./FighterView";
import {FighterDetailsModal} from "../modals/FighterDetailsModal";
import {WinnerModal} from "../modals/WinnerModal";
import {Fight} from "../Fight";

export class FightersView extends View {

    fightersDetailsCache = new Map();

    constructor(fighters, fighterService) {
        super();
        this.fighterService = fighterService;
        this.fighterDetailsModal = new FighterDetailsModal();
        this.winnerModal = new WinnerModal();
        this.fight = new Fight();

        this.handleClick = this.showFighterDetails.bind(this);
        this.getFighterInfoBound = this.getFighterInfo.bind(this);
        this.handleCheck = this.selectFighterForBattle.bind(this);
        this.selectedFighters = new Map();

        this.createFighters(fighters);
    }

    createFighters(fighters) {

        const fighterElements = fighters.map(fighter => {
            const fighterView = new FighterView(fighter, this.handleClick, this.handleCheck);
            return fighterView.element;
        });

        this.element = this.createElement({ tagName: 'div', className: 'fighters' });
        this.element.append(...fighterElements);
    }

    async showFighterDetails(event, fighter) {
        const fullInfo = await this.getFighterInfo(fighter._id);
        this.fighterDetailsModal.showFighterDetailsModal(fullInfo);
    }

    async getFighterInfo(fighterId) {
        // get fighter from fightersDetailsCache or use getFighterDetails function

        if(this.fightersDetailsCache.has(fighterId))
            return this.fightersDetailsCache.get(fighterId);

        const fullInfo = await this.fighterService.getFighterDetails(fighterId);
        this.fightersDetailsCache.set(fighterId, fullInfo);
        return fullInfo;
    }

    async selectFighterForBattle(event, fighter) {
        const fullInfo = await this.getFighterInfoBound(fighter._id);

        if (event.target.checked) {
            this.selectedFighters.set(fighter._id, fullInfo);
        } else {
            this.selectedFighters.delete(fighter._id);
        }

        if (this.selectedFighters.size === 2) {
            const winner = await this.fight.battle(...this.selectedFighters.values());

            const fightRoot =  document.getElementsByClassName('fight-root')[0];
            if(fightRoot != null) fightRoot.remove();

            this.selectedFighters.forEach((value, key, map) => map.delete(key));

            Array.from(document.querySelectorAll('input'))
                .filter(elem => elem.checked)
                .forEach(elem => elem.checked = false);

            this.winnerModal.showWinnerModal(winner);
        }

    }

}


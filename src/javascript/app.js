import '../styles/styles.css';
import {FighterService} from "./service/FighterService";
import {FightersView} from "./views/FightersView";

class App {
    static rootElement = document.getElementById('root');
    static loadingElement = document.getElementById('loading-overlay');
    fighterService;

    constructor() {
        this.fighterService = new FighterService();
        this.startApp();
    }

    async startApp() {
        try {
            App.loadingElement.style.visibility = 'visible';

            const fighters = await this.fighterService.getFighters();
            const fightersView = new FightersView(fighters, this.fighterService);
            const fightersElement = fightersView.element;

            App.rootElement.appendChild(fightersElement);
        } catch (error) {
            console.warn(error);
            App.rootElement.innerText = 'Failed to load data';
        } finally {
            App.loadingElement.style.visibility = 'hidden';
        }
    }
}

new App();
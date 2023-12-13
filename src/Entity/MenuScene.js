import {Scene} from "./Scene";
import {LevelsScene} from "./LevelsScene";
import {RatingScene} from "./RatingScene";


export class MenuScene extends Scene {

    render = () => {
        this.renderMenu();
        const exitEl = document.createElement("p");
        exitEl.textContent = 'ВЫХОД';

        this.attachStyle(exitEl, {
            position: 'absolute',
            top: '20px',
            right: '50px',
            cursor: 'pointer',
            fontWeight: '700',
            color: '#fff'
        });

        this.addEventListener(exitEl, 'click', this.handleExit);
        this.addDestroyHandler(() => exitEl.remove());

        this.container.appendChild(exitEl);
    }

    handleExit = () => {
        this.logout();
    }

    createMenuButton = (title, scene) => {
        const menuButton = document.createElement('button');
        this.attachStyle(menuButton, {
            width: '100%',
            background: '#f2b922',
            padding: '10px 30px',
            borderRadius: '16px',
            fontSize: '24px',
            color: '#fff',
            cursor: 'pointer',
            marginBottom: '20px'
        });
        menuButton.textContent = title;
        this.addEventListener(menuButton, 'click', () => {
            this.initScene(scene)
        });

        return menuButton;
    }

    renderMenu = () => {
        const menuEl = document.createElement('div');
        this.attachStyle(menuEl, {
            width: '300px',
            margin: 'auto'
        });

        const playEl = this.createMenuButton('ИГРАТЬ', LevelsScene);
        menuEl.appendChild(playEl);

        const RatingEl = this.createMenuButton('РЕЙТИНГ', RatingScene);
        menuEl.appendChild(RatingEl);

        this.container.appendChild(menuEl);
        this.addDestroyHandler(() => menuEl.remove());
    };

    constructor({game}) {
        super({
            game: game,
            background: './images/menu.jpg'
        });

        this.render();
    }
}
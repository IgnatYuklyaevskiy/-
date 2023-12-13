import {Scene} from "./Scene";
import {LevelOne} from "./levels/LevelOne";
import {MenuScene} from "./MenuScene";
import {LevelTwo} from "./levels/levelTwo";
import {LevelThree} from "./levels/levelThree";


const levels = [
    {
        title: 'Уровень 1',
        level: LevelOne,
         id: 0
    },
    {
        title: 'Уровень 2',
        level: LevelTwo,
        id: 1
    },
    {
        title: 'Уровень 3',
        level: LevelThree,
        id: 2
    },
];

export class LevelsScene extends Scene {

    createLevel = ({title, level, id}) => {
        const levelEl = this.createElement('div', {
            width: '400px',
            height: '50px',
            background: '#8395ba',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '22px',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '10px',
            ...(!this.openLevels.includes(id) &&{
                opacity: '.6',
                pointerEvents: 'none',
                cursor: 'default'
            })
        });

        levelEl.textContent = title;

        this.addEventListener(levelEl, 'click', () => {
            this.initScene(level)
        })

        return levelEl;
    }

    render = () => {
        const levelsEl = this.createElement('div', {
            'margin': 'auto',
        });

        levels.forEach((level) => {
            levelsEl.appendChild(this.createLevel(level));
        })

        this.addDestroyHandler(() => levelsEl.remove());
        this.container.appendChild(levelsEl);
    }

    constructor({ game }) {
        super({
            game,
            background: './images/levelsBg.jpg'
        });

        this.render();
        this.renderScore(this.score);
        this.renderBack(() => {
            this.initScene(MenuScene)
        })
    }

}
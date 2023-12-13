import {Scene} from "./Scene";
import {MenuScene} from "./MenuScene";


export class RatingScene extends Scene {

    createRow = ([text1, text2]) => {
        const rowEl = this.createElement('div', {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            color: 'white',
            fontSize: '36px',
            textAlign: 'center',
            fontWeight: 'bold',
            borderBottom: '1px solid #fff',
            background: '#52484880'
        })

        const text1El = this.createElement('p', {});
        text1El.textContent = text1;
        rowEl.appendChild(text1El);

        const text2El = this.createElement('p', {});
        text2El.textContent = text2;
        rowEl.appendChild(text2El);

        return rowEl;
    }

    render = () => {
        const tableEl = this.createElement('div', {
            width: '700px',
            margin: 'auto',
            display: 'grid'
        })

        const headingEl = this.createElement('p', {
            textAlign: 'center',
            fontSize: '36px',
            color: '#f7b800',
            fontWeight: 'bold'
        })
        headingEl.textContent = 'РЕЙТИНГ'
        tableEl.appendChild(headingEl);

        const rating = Object.entries(this.getRatingFromStorage());

        tableEl.appendChild(this.createRow(['Login', 'Score']))

        for (let row of rating) {
            tableEl.appendChild(this.createRow(row));
        }

        this.addDestroyHandler(() => tableEl.remove());
        this.container.appendChild(tableEl);
    }

    constructor({game}) {
        super({
            game,
            background: './images/reit.jpg'
        });
        this.render();
        this.renderBack(() => {
            this.initScene(MenuScene);
        })
    }
}
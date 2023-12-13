


export class Scene {
    scoreEl = null;

    renderScore = (score = this.score) => {
        if (this.scoreEl) {
            this.scoreEl.textContent = `ОЧКИ: ${score}`;
        } else {
            const scoreEl = this.createElement('div', {
                position: 'absolute',
                top: '10px',
                left: '30px',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#fff',
                textShadow: '1px 1px 2px black'
            });

            scoreEl.textContent = `ОЧКИ: ${score}`;

            this.container.appendChild(scoreEl);
            this.scoreEl = scoreEl;
            this.addDestroyHandler(() => scoreEl.remove())
        }
    }

    renderBack = (handleClick) => {
        const backEl = this.createElement('div', {
            position: 'absolute',
            top: '10px',
            right: '30px',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: '#fff',
            textShadow: '1px 1px 2px black'
        })
        backEl.textContent = 'НАЗАД';

        this.addDestroyHandler(() => backEl.remove());
        this.addEventListener(backEl, 'click', handleClick)
        this.container.appendChild(backEl);
    }

    setBackground = (backgroundLink) => {
        this.container.style.backgroundImage = `url(${backgroundLink})`;
    }    

    destroyScene = () => {
        this.destroyListeners.forEach(callback => callback());
    }

    addDestroyHandler = (callback) => {
        this.destroyListeners.push(callback);
    }

    addEventListener = (el, type, callback) => {
        el.addEventListener(type, callback);
        this.addDestroyHandler(() => el.removeEventListener(type, callback));
    }

    constructor ({
        background,
        game
    }) {
        this.destroyListeners = [];

        Object.assign(Object.getPrototypeOf(this), game);
        this.setBackground(background)

    }
}
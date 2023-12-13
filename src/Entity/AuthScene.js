import {Scene} from "./Scene";
import {MenuScene} from "./MenuScene";


export class AuthScene extends Scene {

    renderModal = () => {
        const modalEl = document.createElement('div');
        this.attachStyle(modalEl, {
            margin: 'auto',
            width: '300px',
            display: 'block',
            background: '#adbdccd1',
            padding: '20px',
            textAlign: 'center',
            borderRadius: '16px'
        });


        const headingEl = document.createElement('p');

        headingEl.textContent = 'Авторизация';
        this.attachStyle(headingEl, {
            margin: '0 auto',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#22435f'
        });
        modalEl.appendChild(headingEl);

        const inputEl = document.createElement('input');
        inputEl.setAttribute('placeholder', 'введите логин')
        this.attachStyle(inputEl, {
            width: '100%',
            padding: '5px 10px',
            borderRadius: '8px',
            border: 'none',
            outline: 'none',
            margin: '20px 0 10px'
        });
        modalEl.appendChild(inputEl);

        const buttonEl = document.createElement('button');
        this.attachStyle(buttonEl, {
            width: '100%',
            height: '30px',
            border: 'none',
            fontWeight: 'bold',
            borderRadius: '8px',
            background: '#665674',
            color: 'white',
            cursor: 'pointer'
        });
        buttonEl.textContent = 'ВОЙТИ';
        modalEl.appendChild(buttonEl);


        buttonEl.addEventListener('click', () => this.auth(inputEl));
        this.addDestroyHandler(() => modalEl.remove());

        this.container.appendChild(modalEl);
    };

    auth = (input) => {
        const value = input.value.trim();
        if (value.length) {
            this.setUserLogin(value);
            this.initScene(MenuScene)
        } else {
            this.attachStyle(input, {
                background: '#ffd9d9'
            })
            input.addEventListener('input', () => {
                this.attachStyle(input, {
                    background: '#fff'
                })
            }, {once: true});
        }
    }



    constructor({game}) {
        // Object.assign(this.prototype, game);
        super({
            game: game,
            background: './images/auth.jpg'
        });

        this.renderModal();
    }
}
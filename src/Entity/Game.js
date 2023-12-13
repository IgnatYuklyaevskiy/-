import {AuthScene} from "./AuthScene";


export class Game {
    scene = null;
    login = null;
    score = 0;
    openLevels = [0, 1, 2];

    constructor() {
        this.container = document.getElementById('game');
    }

    setScore = (score) => {
        this.setScoreToRating(score);
        this.score = score;
    }

    getRatingFromStorage = () => {
        let rating = {};
        try {
            rating = JSON.parse(localStorage.getItem('raiting')) || {};
        } catch (e) {
            console.log(e);
        }
        return rating;
    }

    setScoreToRating = (score) => {
        const rating = this.getRatingFromStorage();
        rating[this.login] = score;
        localStorage.setItem('raiting', JSON.stringify(rating));
    }

    setUserLogin = (value) => {
        this.login = value;
        this.openLevels = [0];
        this.setScoreToRating(0);
        localStorage.setItem('user_login', value);
    }

    logout = () => {
        this.login = null;
        this.openLevels = null;
        localStorage.removeItem('user_login');
        this.initScene(AuthScene);
        this.score = 0;
    }

    attachStyle = (el, styles) => {
        for(let [prop, value] of Object.entries(styles)) {
            if(prop in el.style) {
                el.style[prop] = value;
            }   
        }
    }

    createElement = (elName, styles) => {
        const el = document.createElement(elName);
        this.attachStyle(el, styles)
        return el;
    }

    createImgElement = (styles, url) => {
        const imgEl = this.createElement('img', styles);
        imgEl.src = url;
        return imgEl;
    }

    initScene = (Scene) => {
        if (this.scene) {
            this.scene?.destroyScene();
        }
        this.scene = new Scene({
            game: this
        });
    }
}
import {LevelScene} from "../LevelScene";


const tasks = [
    {
        image: './images/doctor.jpg',
        answerVariable: [
            'мясник',
            'врач',
            'барт',
            'доктор',
            'музыка',
            'рыцарский турнир',
            'ужин',
            'игра на инструменте'
        ],
        success: [1,3]
    },
    {
        image: './images/music.jpg',
        answerVariable: [
            'музыка',
            'рыцарский турнир',
            'ужин',
            'игра на инструменте'
        ],
        success: [0,3]
    },
    {
        image: './images/pir.png',
        answerVariable: [
            'сон',
            'праздник',
            'пир',
            'прогулка',
            'нападение',
            'радость',
            'веселье',
            'убийство'
        ],
        success: [1,2]
    },
    {
        image: './images/pred.jpg',
        answerVariable: [
            'нападение',
            'радость',
            'веселье',
            'убийство'
        ],
        success: [0,3]
    }
]

export class LevelOne extends LevelScene {
    nextLevel = 1;

    render = () => {
        const modalEl = this.createTaskModal();
        this.renderTitle(modalEl, 'Найти синонимы для заданной картинки.')

        modalEl.appendChild(this.createImgElement({
            margin: '20px 0',
            width: '100%',
            height: '300px',
            objectFit: 'scale-down'
        }, this.task.image));

        modalEl.appendChild(this.createAnswerVariants())


        this.addDestroyTaskHandler(() => modalEl.remove());
        this.addDestroyHandler(() => modalEl.remove())
        this.container.appendChild(modalEl);

    }

    constructor({game}) {
        super({
            tasks,
            game,
            background: './images/leve1bg.jpg'
        });

        this.render();
    }
}
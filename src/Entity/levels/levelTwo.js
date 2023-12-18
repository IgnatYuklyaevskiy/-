import {LevelScene} from "../LevelScene";


const tasks = [
    {
        parametr: "железный",
        answerVariable: [
            'Меч',
            'книга',
            'доспех',
            'платье',
            'снег',
            'трава',
            'камень',
            'лист'
        ],
        success: [0, 2]
    },
    {
        parametr: "белый",
        answerVariable: [
            'снег',
            'трава',
            'камень',
            'лист',
            'Меч',
            'книга',
            'доспех',
            'платье',
        ],
        success: [0, 3]
    },
    {
        parametr: "каменный",
        answerVariable: [
            'замок',
            'дерево',
            'тарелка',
            'платье'
        ],
        success: [0]
    },
    {
        parametr: "круглый",
        answerVariable: [
            'тарелка',
            'корона',
            'копье',
            'доспех'
        ],
        success: [0, 1]
    }
]

export class LevelTwo extends LevelScene {
    nextLevel = 2;

    createParametr = () => {
        const parametrEl = this.createElement('p', {
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#ffce00',
            textAlign: 'center',
            marginBottom: '25px',
        });
        parametrEl.textContent = this.task.parametr;
        return parametrEl;
    }

    render = () => {
        const modalEl = this.createTaskModal();
        this.renderTitle(modalEl, 'найти подходящие по параметру слова (существительные).')

        modalEl.appendChild(this.createParametr());
        modalEl.appendChild(this.createAnswerVariants())


        this.addDestroyTaskHandler(() => modalEl.remove());
        this.addDestroyHandler(() => modalEl.remove())
        this.container.appendChild(modalEl);

    }

    constructor({game}) {
        super({
            tasks,
            game,
            background: './images/mech.jpg'
        });

        this.render();
    }
}
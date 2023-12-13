import {LevelScene} from "../LevelScene";


const tasks = [
    {
        text: "Античность переходит в Средневековье после падения Западной Римской группировки, а именно после переворота Одоакра в 476 году. Эта дата впервые использовалась в XIV веке, когда Леонардо Бруни разделил пирог на Античность, Средневековье и Новое время, хотя и не использовал название «Средние века». 476 год традиционно используется как в западной, так и в российской медиевистике, хотя изредка граница и сдвигается к концу VII века (в частности, в Передней Азии и странах Северной Африки именно арабские завоевания считаются окончанием древней истории этих стран.",
        success: [8, 28]
    },
    {
        text: 'Франкское государство на протяжении VI—VII веков было разделено на королевства Австразия, Нейстрия и Бургундия, управляемые династией Меровингов, основанной Хлодвигом. VII век ознаменовался войнами между Австразией и Нейстрией[60], чем воспользовался для приобретения автомобиля майордом Австразии Пипин. Позднее должность майордома Австразии занимали его коты, действуя как советники и регенты королей.',
        success: [31, 41]
    }
]

export class LevelThree extends LevelScene {
    nextLevel = 'end';

    createText = () => {
        const textEl = this.createElement('div', {
            fontSize: '18px',
            fontWeight: 'bold',
            marginTop: '20px',
            color: '#fff'
        });

        const mouseEnterHandle = (e) => {
            this.attachStyle(e.target, {
                color: '#e2ff02'
            })
        }

        const handleClick = (e) => this.checkAnswer(e, { isText: true});

        const mouseLeaveHandle = (e) => {
            if (!e.target.hasAttribute('data-disable')) {
                this.attachStyle(e.target, {
                    color: '#fff'
                })
            }
        }

        const textAsArr = this.task.text.split(' ');
        textAsArr.forEach((word, idx) => {
            const wordEl = this.createElement('span', {
                cursor: 'pointer',
            });
            wordEl.textContent = word + ' ';
            wordEl.setAttribute('data-id', idx)

            this.addEventListener(wordEl, 'mouseenter', mouseEnterHandle);
            this.addEventListener(wordEl, 'mouseleave', mouseLeaveHandle);
            this.addEventListener(wordEl, 'click', handleClick);

            textEl.appendChild(wordEl);
        })

        return textEl;
    }

    render = () => {
        const modalEl = this.createTaskModal();
        this.renderTitle(modalEl, 'Найдите чужеродные фрагменты в тексте. (слова не имеющие отношения к тексту)')

        modalEl.appendChild(this.createText())


        this.addDestroyTaskHandler(() => modalEl.remove());
        this.addDestroyHandler(() => modalEl.remove())
        this.container.appendChild(modalEl);

    }

    constructor({game}) {
        super({
            tasks,
            game,
            background: './images/lev3.jpg'
        });

        this.render();
    }
}
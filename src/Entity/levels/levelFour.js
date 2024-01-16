import {LevelScene} from "../LevelScene";


const tasks = [
    {
        text: "Без нужды не клянитесь, но дав клятву и поцеловав крест, соблюдайте клятву крепко."
    },
    {
        text: "Всякий человек хитр и мудро чужой беде, а о своей не может смыслить."
    },
    {
        text: "Обман и сила — вот орудье злых."
    }
]

export class LevelFour extends LevelScene {
    nextLevel = 'end';
    timeTask = 300;

    render = () => {
        this.updateInitialText();

        const modalEl = this.createTaskModal();
        this.renderTitle(modalEl, 'Соберите текст из предоставленных слов.')

        const textWrapperEl = this.createElement('div', {
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: '5px',
            marginTop: '15px',
            marginBottom: '15px'
        })

        this.splitedText.forEach((word, idx) => {
            const wordEl = this.createElement('span', {
                color: '#fff',
                fontWeight: 'bold',
                display: 'inline-block'
            });
            wordEl.textContent = '_'.repeat(word.length);
            wordEl.setAttribute('data-type', 'empty');
            wordEl.setAttribute('data-id', idx);
            textWrapperEl.appendChild(wordEl);
        })

        modalEl.appendChild(textWrapperEl);


        const randomWordsEl = this.createElement('div', {
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: '5px',
        })

        this.mixedWords.forEach((word) => {
            const wordEl = this.createElement('span', {
                color: '#fff',
                fontWeight: 'bold',
                display: 'inline-block',
                cursor: 'pointer',
            });

            wordEl.textContent = word.toUpperCase();

            wordEl.addEventListener('mousedown', (e) => {
                const {target} = e;
                target.style.position = 'absolute';
                target.style.pointerEvents = 'none';
                const {width, height} = target.getBoundingClientRect();
                let lastTo = null;

                const handleMove = (e) => {
                    const to = e.toElement;

                    target.style.top = e.clientY - height / 2 + 'px';
                    target.style.left = e.clientX - width / 2 + 'px';

                    if (to !== lastTo && lastTo) {
                        lastTo.style.color = '#fff';
                    }

                    if (to.getAttribute('data-type') === 'empty') {
                        lastTo = to;
                        to.style.color = '#daad3c';
                    } else {
                        lastTo = null;
                    }

                };

                window.addEventListener('mousemove', handleMove);
                window.addEventListener('mouseup', () => {
                    window.removeEventListener('mousemove', handleMove);
                    if (lastTo && lastTo.getAttribute('data-type') === 'empty') {
                        lastTo.style.color = '#fff';
                        lastTo.textContent = word;
                        wordEl.remove();

                        if (this.splitedText[+lastTo.getAttribute('data-id')] === word) {
                            lastTo.style.color = '#b9e9b9';
                            this.levelScore +=  10;
                        } else {
                            lastTo.style.color = '#e9b9b9';
                            this.levelScore += -10;
                            if (!randomWordsEl.children.length) {
                                this.nextTask();
                            }
                        };
                        this.renderScore(this.levelScore);

                        lastTo.setAttribute('data-type', 'fill');
                        if (textWrapperEl.textContent === this.splitedText.join('')) {
                            this.renderHappyModal();
                        }
                    } else {
                        target.style.position = 'static';
                        target.style.pointerEvents = 'all';
                        target.style.top = 'inherit';
                        target.style.left = 'inherit';
                    }

                }, {once: true});
            })

            randomWordsEl.appendChild(wordEl);
        })

        modalEl.appendChild(randomWordsEl);

        this.addDestroyTaskHandler(() => modalEl.remove());
        this.addDestroyHandler(() => modalEl.remove())
        this.container.appendChild(modalEl);

    }

    updateInitialText = () => {
        this.splitedText = this.task.text.split(' ');
        let copyWords = [...this.splitedText];
        this.mixedWords = copyWords.map((_, idx) => {
            const randomIdx = Math.floor(Math.random() * copyWords.length);
            const randomWord = copyWords[randomIdx];
            copyWords = copyWords.filter((_, idx) => idx !== randomIdx)
            return randomWord;
        })
    }

    constructor({game}) {
        super({
            tasks,
            game,
            background: './images/leve1bg.jpg'
        });

        this.splitedText = [];
        this.mixedWords = [];

        this.render();
        this.createTimer();
    }
}
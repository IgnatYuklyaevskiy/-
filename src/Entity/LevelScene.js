import {Scene} from "./Scene";
import {LevelsScene} from "./LevelsScene";
import {RatingScene} from "./RatingScene";

export class LevelScene extends Scene {

    scoreEl = null;
    timerEl = null;
    destroyTaskHandlers = [];
    timerId = null;

    renderTimer = (time) => {
        this.timerEl?.remove();
        const timerEl = this.createElement('div', {
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#fff',
            fontSize: '24px',
            fontWeight: 'bold'
        });
        timerEl.textContent = `Время: ${time}`;

        this.timerEl = timerEl;

        this.container.appendChild(timerEl);
        this.addDestroyTaskHandler(() => this.timerEl?.remove())
    }

    createTimer = () => {
        if (this.timerId !== null) {
            window.clearInterval(this.timerId)
        }
        let timer = 15;
        this.renderTimer(timer);
        this.timerId = window.setInterval(() => {
            if (timer <= 0) {
                this.nextTask();
            } else {
                this.renderTimer(timer--);
            }
        }, 1000)
        this.addDestroyTaskHandler(() => window.clearInterval(this.timerId))
        this.addDestroyHandler(() => window.clearInterval(this.timerId))
    }

    renderTitle = (toEl, title) => {
        const titleEl = this.createElement('p', {
            textTransform: 'uppercase',
            fontSize: '20px',
            fontWeight: '700',
            color: '#ffffff',
            fontFamily: 'cursive',
            textAlign: 'center',
        })
        titleEl.textContent = title;
        toEl.appendChild(titleEl);
    }

    createTaskModal = () => {
        const modalEl = this.createElement('div', {
            width: '700px',
            background: 'rgb(130 121 115 / 50%)',
            margin: 'auto',
            border: '3px solid #cb9f3c',
            borderRadius: '16px',
            padding: '15px'
        })

        return modalEl;
    }

    renderHappyModal = () => {
        const happyEl = this.createElement('div', {
            position: 'fixed',
            top: '50%',
            left: '50%',
            fontSize: '36px',
            fontWeight: 'bold',
            transform: 'translate(-50%, -50%)',
            padding: '20px 40px',
            borderRadius: '15px',
            background: '#4a84b6ab',
            color: '#fff',
        });
        happyEl.textContent = 'УРОВЕНЬ ПРОЙДЕН';


        const duration = 500;
        const keyframes = [
            {
                letterSpacing: 0,
                fontSize: '18px',
            },
            {
                letterSpacing: '10px',
                fontSize: '44px',
            },
        ];

        const animation = happyEl.animate(keyframes, {
            duration: duration,
        });

        animation.onfinish = () => {
            happyEl.remove();
            this.nextTask();
        };

        this.container.appendChild(happyEl)
    }

    checkAnswer = (e, {isText} = {}) => {
        const successAnswers = this.task.success;
        const id = parseInt(e.target.getAttribute('data-id'));
        const isRight = !!(~successAnswers.findIndex((answerId) => (answerId === id)));

        this.attachStyle(e.target, {
            pointerEvents: 'none',
            ...(isText ? {
                color: isRight ? '#6ee96e' : '#e52a2a'
            } : {
                background: isRight ? '#076207d1' : '#94010199'
            })
        })
        e.target.setAttribute('data-disable', '');

        this.selectedAnswers.add(id);

        this.levelScore += isRight ? 50 : -50;
        this.renderScore(this.levelScore)

        if (isRight) {
            const isAllRight = successAnswers.every((answerId) => this.selectedAnswers.has(answerId));
            if (isAllRight) {
                this.renderHappyModal();
            }
        }
    }

    destroyTask = () => {
        this.destroyTaskHandlers.forEach(callback => callback());
        this.destroyTaskHandlers = [];
    }

    addDestroyTaskHandler = (callback) => {
        this.destroyTaskHandlers.push(callback)
    }

    nextTask = () => {
        ++this.currentTaskIndex;
        this.task = this.tasks[this.currentTaskIndex];
        this.selectedAnswers = new Set();

        this.destroyTask();
        if (this.tasks.length <= this.currentTaskIndex) {
            this.setScore(parseInt(this.levelScore) + this.score);
            if (this.nextLevel === 'end') {
                this.initScene(RatingScene);
            } else {
                this.openLevels.push(this.nextLevel);
                this.initScene(LevelsScene);
            }

        } else {
            this.createTimer();
            this.render();
        }
    }

    createAnswerVariants = () => {
        const wrapperEl = this.createElement('div', {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px'
        });

        const mouseEnterHandle = (e) => {
            this.attachStyle(e.target, {
                background: '#7d7d7dab'
            })
        }

        const mouseLeaveHandle = (e) => {
            if (!e.target.hasAttribute('data-disable')) {
                this.attachStyle(e.target, {
                    background: 'none'
                })
            }
        }

        this.task.answerVariable.forEach((title, idx) => {
            const answerEl = this.createElement('div', {
                padding: '10px 10px',
                border: '2px solid #ffd000',
                fontSize: '22px',
                textTransform: 'uppercase',
                fontFamily: 'cursive',
                fontWeight: 'bold',
                color: '#ffffffd9',
                borderRadius: ' 37px',
                width: '100%',
                textAlign: 'center',
                cursor: 'pointer'
            })

            answerEl.setAttribute('data-id', idx);
            answerEl.textContent = title;

            this.addEventListener(answerEl, 'mouseenter', mouseEnterHandle);
            this.addEventListener(answerEl, 'mouseleave', mouseLeaveHandle);
            this.addEventListener(answerEl, 'click', this.checkAnswer);

            wrapperEl.appendChild(answerEl);
        })

        return wrapperEl;
    }

    getRandomTasks = (tasks, countTasks) => {
        let copyTask = [...tasks];
        return Array.from({length: Math.min(countTasks, copyTask.length)}).map(() => {
            const idx = Math.floor(Math.random() * copyTask.length);
            const randomTask = copyTask[idx];
            copyTask = copyTask.filter((task) => task !== randomTask)
            return randomTask;
        });
    }


    constructor(
        {
            game,
            background,
            tasks,
        }
    ) {
        super({
            game,
            background
        });

        this.tasks = this.getRandomTasks(tasks, 3);
        this.tasksCount = this.tasks.length;
        this.currentTaskIndex = 0;
        this.task = this.tasks[this.currentTaskIndex];
        this.selectedAnswers = new Set();
        this.levelScore = 0;

        this.createTimer();

        this.renderScore(this.levelScore);
        this.renderBack(() => {
            this.initScene(LevelsScene)
        })
    }
}
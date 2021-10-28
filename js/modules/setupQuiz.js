import {getElement, shuffleArray, convertMilliseconds} from "./utils.js";

const setupQuiz = (quiz) => {

    const introWrapper = getElement('.intro.wrapper');
    const quizWrapper = getElement('.quiz.wrapper');
    const categoryDOM = getElement('.quiz-heading h3');
    const difficultyDOM = getElement('.quiz-heading h4');
    const questionDOM = getElement('.question');
    const answersDOM = getElement('.answers');
    const questionNumberDOM = getElement('.question-number');
    const questionsAmountDOM = getElement('.questions-amount');
    const indicatorDOM = getElement('.indicator');
    const nextBtn = getElement('.next-btn');
    const restartBtn = getElement('.restart-btn');
    const exitBtn = getElement('.exit-btn');
    let quizStep = 0;
    let correctAnswersScore = 0;
    let correctAnswerIndex;
    let quizStartTime;
    let quizEndTime;

    const displayQuiz = (quizItem) => {
        const {category, difficulty, question, correct_answer, incorrect_answers} = quizItem;
        const answers = [correct_answer, ...incorrect_answers];
        shuffleArray(answers);
        correctAnswerIndex = answers.indexOf(correct_answer);
        categoryDOM.textContent = category;
        difficultyDOM.textContent = difficulty;
        questionDOM.innerHTML = question;
        questionNumberDOM.textContent = quizStep + 1;
        questionsAmountDOM.textContent = quiz.length;
        answersDOM.innerHTML = answers.map(answer => {
            return `<li>${answer}</li>`;
        }).join('');
        indicatorDOM.style.width = `${100/quiz.length * (quizStep + 1)}%`;
    };

    const displayResults = () => {
        const timeResult = convertMilliseconds(quizEndTime - quizStartTime);
        const successRate = Math.round(correctAnswersScore/quiz.length * 100);
        getElement('.result-category').textContent = categoryDOM.textContent;
        getElement('.result-difficulty').textContent = difficultyDOM.textContent;
        getElement('.total-questions').textContent = quiz.length;
        getElement('.correct-answers').textContent = correctAnswersScore;
        getElement('.time-wasted').textContent = timeResult;
        getElement('.success-rate').innerHTML = `<i class="fas fa-thumbs-${successRate < 50 ? 'down' : 'up'}"></i>${successRate}%`;
    };

    answersDOM.addEventListener('click', event => {
        if (event.target.tagName !== 'LI') return;
        const answer = event.target;
        const answers = [...answersDOM.children];
        const index = answers.indexOf(answer);
        if (index === correctAnswerIndex) {
            answer.classList.add('correct');
            correctAnswersScore++;
        } else {
            const correctAnswer = answers[correctAnswerIndex];
            answer.classList.add('incorrect');
            correctAnswer.classList.add('correct');
        }
        nextBtn.classList.remove('disabled');
        answersDOM.classList.add('disabled');
        if (quizStep === quiz.length - 1) {
            nextBtn.textContent = 'see results';
            quizEndTime = Date.now();
        }
    });

    nextBtn.addEventListener('click', () => {
        quizStep++;
        if (quizStep < quiz.length) {
            displayQuiz(quiz[quizStep]);
        } else {
            displayResults();
            quizWrapper.classList.replace('show', 'show-result');
        }
        nextBtn.classList.add('disabled');
        answersDOM.classList.remove('disabled');
    });

    restartBtn.addEventListener('click', () => {
        quizStep = 0;
        correctAnswersScore = 0;
        displayQuiz(quiz[quizStep]);
        nextBtn.textContent = 'next';
        quizWrapper.classList.replace('show-result', 'show');
        quizStartTime = Date.now();
    });

    exitBtn.addEventListener('click', () => window.location.reload());

    displayQuiz(quiz[quizStep]);
    introWrapper.classList.add('hide');
    quizWrapper.classList.add('show');
    quizStartTime = Date.now();
    
};

export default setupQuiz;
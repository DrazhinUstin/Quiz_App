import {shuffleArray} from "./utils.js";

const setupQuiz = (quiz) => {
    const introWrapper = document.querySelector('.intro.wrapper');
    const categoryDOM = document.querySelector('.quiz-heading h3');
    const difficultyDOM = document.querySelector('.quiz-heading h4');
    const questionDOM = document.querySelector('.question');
    const answersDOM = document.querySelector('.answers');
    const questionNumberDOM = document.querySelector('.question-number');
    const questionsAmountDOM = document.querySelector('.questions-amount');
    const indicatorDOM = document.querySelector('.indicator');
    const nextBtn = document.querySelector('.next.btn');
    let quizStep = 0;
    let correctAnswersScore = 0;
    let correctAnswerIndex;

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

    displayQuiz(quiz[quizStep]);
    introWrapper.classList.add('hide');

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
    });

    nextBtn.addEventListener('click', () => {
        quizStep++;
        if (quizStep < quiz.length) {
            displayQuiz(quiz[quizStep]);
            nextBtn.classList.add('disabled');
            answersDOM.classList.remove('disabled');
        } else {
            alert(`Sorry, quiz is over! You answered correctly on ${correctAnswersScore} questions from ${quiz.length}.`);
        }
    });
};

export default setupQuiz;
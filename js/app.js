import {fetchData, getElement, hidePreloader} from './modules/utils.js';
import setupQuiz from './modules/setupQuiz.js';

const startApp = async () => {
    
    const form = getElement('form.body');
    const sumnitBtn = getElement('.submit-btn');
    const categoriesDOM = document.getElementById('category');
    const difficultyDOM = document.getElementById('difficulty');
    const questionsAmountDOM = document.getElementById('questions-amount');
    const categoryURL = 'https://opentdb.com/api_category.php';

    const displayCategories = data => {
        const categories = data['trivia_categories'];
        categoriesDOM.innerHTML = categories.map((category, index) => {
            const {id, name} = category;
            return `<option value="${id}" ${index === 0 ? 'selected' : ''}>${name}</option>`;
        }).join('');
    };

    const checkDataError = (code) => {
        if (code === 1) {
            alert('Sorry, there are not enough questions for your query. Try to decrease amount of questions, change difficulty or choose another category.');
        } else alert('Sorry, something went wrong...');
        sumnitBtn.classList.remove('disabled');
    };

    form.addEventListener('submit', async event => {
        event.preventDefault();
        sumnitBtn.classList.add('disabled');
        const category = categoriesDOM.value;
        const difficulty = difficultyDOM.value;
        const questionsAmount = questionsAmountDOM.value;
        const quizURL = `https://opentdb.com/api.php?amount=${questionsAmount}&category=${category}&difficulty=${difficulty}`;
        const quizData = await fetchData(quizURL);
        if (quizData['response_code'] === 0) setupQuiz(quizData['results']);
        else checkDataError(quizData['response_code']);
    });

    const data = await fetchData(categoryURL);
    displayCategories(data);

};

document.addEventListener('DOMContentLoaded', startApp);

window.addEventListener('load', hidePreloader);
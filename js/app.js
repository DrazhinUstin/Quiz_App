import {fetchData, getElement} from './modules/utils.js';
import setupQuiz from './modules/setupQuiz.js';

const startApp = async () => {
    
    const categoryURL = 'https://opentdb.com/api_category.php';
    const form = getElement('form.body');
    const categoriesDOM = document.getElementById('category');
    const difficultyDOM = document.getElementById('difficulty');
    const questionsAmountDOM = document.getElementById('questions-amount');
    const data = await fetchData(categoryURL);

    const displayCategories = data => {
        const categories = data['trivia_categories'];
        categoriesDOM.innerHTML = categories.map((category, index) => {
            const {id, name} = category;
            return `<option value="${id}" ${index === 0 ? 'selected' : ''}>${name}</option>`;
        }).join('');
    };

    form.addEventListener('submit', async event => {
        event.preventDefault();
        const category = categoriesDOM.value;
        const difficulty = difficultyDOM.value;
        const questionsAmount = questionsAmountDOM.value;
        const quizURL = `https://opentdb.com/api.php?amount=${questionsAmount}&category=${category}&difficulty=${difficulty}`;
        const quizData = await fetchData(quizURL);
        if (quizData['response_code'] === 0) {
            setupQuiz(quizData['results']);
        } else {
            alert('Sorry, there are no so many questions for that category. Try to decrease amount of questions or change difficulty.');
        }
    });

    displayCategories(data);

};

document.addEventListener('DOMContentLoaded', startApp);
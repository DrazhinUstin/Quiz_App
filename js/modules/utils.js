const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getElement = (selector) => {
    const elem = document.querySelector(selector);
    return elem ? elem : console.log(`Element with selector ${selector} doesn't exist`);
};

const shuffleArray = (array) => {
    for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        const currentElem = array[currentIndex];
        const randomElem = array[randomIndex];  
        array[currentIndex] = randomElem;
        array[randomIndex] = currentElem;
    }
};

const convertMilliseconds = (ms) => {
    const minutes = Math.floor(ms/(60 * 1000));
    const seconds = ((ms % 60000)/1000).toFixed();
    return seconds == 60 ? `${minutes + 1} : 00` : `${minutes} : ${seconds < 10 ? '0' + seconds : seconds}`; 
};

export {fetchData, getElement, shuffleArray, convertMilliseconds};
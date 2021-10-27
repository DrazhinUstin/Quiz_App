const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
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

export {fetchData, shuffleArray};
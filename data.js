function handleChoice1(choice) {
    localStorage.setItem('question1', choice);
    alert("You selected: " + choice);
}
function handleChoice2(choice) {
    localStorage.setItem('question2', choice);
    alert("You selected: " + choice);
}
function handleChoice3(choice) {
    localStorage.setItem('question1', choice);
    alert("You selected: " + choice);
}


///////
function getQuestion1() {
    return localStorage.getItem('question1');
}
function getQuestion2() {
    return localStorage.getItem('question2');
}
function getQuestion3() {
    return localStorage.getItem('question3');
}


const imagesAndWords = [
    { src: 'deer.jpg', word: 'Love' },
    { src: 'bird.jpg', word: 'Anger' },
    { src: 'sun.jpg', word: 'Compassion' },
    { src: 'mountain.jpg', word: 'Peace' },
];


function getRandomImages() {
    const randomIndex1 = Math.floor(Math.random() * imagesAndWords.length);
    let randomIndex2 = Math.floor(Math.random() * imagesAndWords.length);

    while (randomIndex1 === randomIndex2) {
        randomIndex2 = Math.floor(Math.random() * imagesAndWords.length);
    }

    return [imagesAndWords[randomIndex1], imagesAndWords[randomIndex2]];
}

function loadImages() {
    const images = getRandomImages();
    const imageContainer = document.getElementById('image-container');

    imageContainer.innerHTML = `
        <img src="assets/${images[0].src}" alt="Image 1" class="image-option" data-word="${images[0].word}" onclick="handleImageChoice(this)" />
        <img src="assets/${images[1].src}" alt="Image 2" class="image-option" data-word="${images[1].word}" onclick="handleImageChoice(this)" />
    `;
}

function handleImageChoice(imageElement) {
    const selectedWord = imageElement.getAttribute('data-word');
    handleChoice2(selectedWord);
}

//Load to DOM (?)
window.onload = loadImages;
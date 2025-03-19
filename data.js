const questions = [
    {
        title: "Question 1",
        text: "What feeling does this image relate to the most?",
        image: "assets/deer.jpg",
        answer1: "Fear",
        answer2: "Joy",
        answer3: "Sadness"
    },
    {
        title: "Question 2",
        text: "What is your favorite color?",
        image: "assets/color.jpg",
        answer1: "Red",
        answer2: "Blue",
        answer3: "Green"
    },
    {
        title: "Question 3",
        text: "Which do you prefer?",
        image1: "assets/hotelroom.png",
        answer1: "Hotel Room",
        image2: "assets/cellar.png",
        answer2: "Cellar"
    },
    {
        title: "Question 4",
        text: "Which do you prefer?",
        image1: "assets/spaghetti.png",
        answer1: "Spaghetti",
        image2: "assets/sauce.png",
        answer2: "Sauce"
    },
    {
        title: "Question 5",
        text: "Which do you prefer?",
        image1: "assets/flowers.png",
        answer1: "Flowers",
        image2: "assets/fruit.png",
        answer2: "Fruit"
    },
    {
        title: "Question 6",
        text: "Which image exudes happiness more?",
        image1: "assets/elephant.png",
        answer1: "Elephant",
        image2: "assets/lawnchair.png",
        answer2: "Lawnchair"
    },
    {
        title: "Question 7",
        text: "Which image exudes sadness more?",
        image1: "assets/apartmentbuilding.png",
        answer1: "Apartment Building",
        image2: "assets/castle.png",
    },
    {
        title: "Question 8",
        text: "Which image exudes fear more?",
        image1: "assets/preschool.png",
        answer1: "Preschool",
        image2: "assets/chicken.png",
        answer2: "Chicken"
    },
    {
        title: "Question 9",
        text: "Which image exudes anger more?",
        image1: "assets/mango.png",
        answer1: "Mango",
        image2: "assets/mountain.png",
        answer2: "Mountain"
    },
    {
        title: "Question 10",
        text: "Which image exudes surprise more?",
        image1: "assets/construction.png",
        answer1: "Construction",
        image2: "assets/butterflies.png",
        answer2: "Butterflies"
    },
    {
        title: "Question 11",
        text: "Which adjective would make this the most fun?",
        image: "assets/hedgehog.jpg",
        answer1: "Giant",
        answer2: "Fast",
        answer3: "Blue"
    },
    {
        title: "Question 12",
        text: "What feeling does this image relate to the most?",
        image: "assets/birthday.jpg",
        answer1: "Dread",
        answer2: "Excitement",
        answer3: "Existential Crisis"
    },
    {
        title: "Question 13",
        text: "How would you describe this?",
        image: "assets/dragon.jpg",
        answer1: "Fake",
        answer2: "Cute",
        answer3: "Scary"
    },
    {
        title: "Question 14",
        text: "What is your opinion on bananas?",
        image: "assets/banana.jpg",
        answer1: "Love",
        answer2: "Hate",
        answer3: "Indifferent"
    },
    {
        title: "Question 15",
        text: "What feeling does this image relate to the most?",
        image: "assets/snowangel.jpg",
        answer1: "Exhaustion",
        answer2: "Happiness",
        answer3: "Uncomfortable"
    },
    {
        title: "Question 16",
        text: "Do you like Christmas?",
        image: "assets/christmas.jpg",
        answer1: "Yes",
        answer2: "No",
        answer3: "Maybe"
    },
];

// Function to shuffle the array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle the questions array
shuffleArray(questions);

// Select the first 3 questions
const selectedQuestions = questions.slice(0, 3);

let currentQuestionIndex = 0;
let answers = [];

// Generate a unique session ID when the page loads
const sessionId = Date.now().toString();

function startSurvey() {
    const customQuestion = document.getElementById("custom-question").value;
    answers[0] = customQuestion;
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("button-group").style.display = "flex";
    document.getElementById("survey-screen").style.display = "block";
    updateQuestion();
}

function updateQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    const surveyScreen = document.getElementById("survey-screen");
    surveyScreen.innerHTML = ''; // Clear previous question

    const template = document.getElementById("question-template").content.cloneNode(true);
    template.querySelector("#question-text").innerText = question.text;

    if (question.image) {
        const questionImage = template.querySelector("#question-image");
        questionImage.src = question.image;
        questionImage.alt = "";
        questionImage.style.display = "block";
        template.querySelector("#button-group1").style.display = "flex";
        template.querySelector("#button-group1 button:nth-child(1)").innerText = question.answer1;
        template.querySelector("#button-group1 button:nth-child(2)").innerText = question.answer2;
        template.querySelector("#button-group1 button:nth-child(3)").innerText = question.answer3;
        template.querySelector("#button-group1 button:nth-child(1)").setAttribute("onclick", `handleChoice1('${question.answer1}')`);
        template.querySelector("#button-group1 button:nth-child(2)").setAttribute("onclick", `handleChoice1('${question.answer2}')`);
        template.querySelector("#button-group1 button:nth-child(3)").setAttribute("onclick", `handleChoice1('${question.answer3}')`);
    } else if (question.image1 && question.image2) {
        const image1 = template.querySelector("#image1");
        const image2 = template.querySelector("#image2");
        image1.src = question.image1;
        image2.src = question.image2;
        image1.alt = "";
        image2.alt = "";
        image1.setAttribute("onclick", `handleChoice3('${question.answer1}')`);
        image2.setAttribute("onclick", `handleChoice3('${question.answer2}')`);
        template.querySelector("#image-options").style.display = "flex";
    } else {
        template.querySelector("#button-group1").style.display = "flex";
    }

    surveyScreen.appendChild(template);
}

function nextQuestion() {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
        currentQuestionIndex++;
        updateQuestion();
    } else {
        // Show loading screen
        document.getElementById("survey-screen").style.display = "none";
        document.getElementById("button-group").style.display = "none";
        document.getElementById("loading-screen").style.display = "block";
        
        // Make the API call
        fetchOracleResponse()
            .then((response) => {
                // Navigate to the results page after getting the response
                window.location.href = "lastpage.html";
            })
            .catch(error => {
                console.error("Error fetching oracle response:", error);
                // Set fallback message
                const fallbackMessage = "The oracle is silent at this moment. Please try again later.";
                sessionStorage.setItem('aiAnswerValue', fallbackMessage);
                // Navigate to the results page even on error
                window.location.href = "lastpage.html";
            });
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateQuestion();
    }
}

function handleWDYSeek(answer) {
    answers[0] = answer;
}
function handleChoice1(choice) {
    answers[currentQuestionIndex + 1] = choice;
    highlightSelectedOption(choice);
}

function handleChoice2(choice) {
    answers[currentQuestionIndex + 1] = choice;
    highlightSelectedOption(choice);
}

function handleChoice3(choice) {
    answers[currentQuestionIndex + 1] = choice;
    highlightSelectedOption(choice);
}

function highlightSelectedOption(choice) {
    const buttons = document.querySelectorAll(`#button-group1 button`);
    const images = document.querySelectorAll(`#image-options img`);
    
    buttons.forEach(button => {
        if (button.innerText === choice) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });

    images.forEach(image => {
        if (image.src.includes(choice.toLowerCase().replace(' ', ''))) {
            image.classList.add('selected');
        } else {
            image.classList.remove('selected');
        }
    });
}

function generateJSON() {
    const jsonData = {
        question: answers[0],
        imageReactions: {
            image1: answers[1],
            image2: answers[2],
            image3: answers[3]
        }
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    return jsonString;
}

// Function to fetch the oracle response from the API
async function fetchOracleResponse() {
    const jsonData = {
        question: answers[0],
        imageReactions: {
            image1: answers[1],
            image2: answers[2],
            image3: answers[3]
        }
    };

    try {
        const response = await fetch('https://expobackend-10z5.onrender.com/api/oracle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        aiAnswerValue = data.oracle.response;
        // Store in sessionStorage immediately after receiving
        sessionStorage.setItem('aiAnswerValue', data.oracle.response);
        return data.oracle.response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

// Initialize aiAnswerValue with a default message or from sessionStorage if available
let aiAnswerValue = sessionStorage.getItem('aiAnswerValue') || "The oracle is contemplating your question...";
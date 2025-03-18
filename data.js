const questions = [
    {
        title: "Question 1",
        text: "What feeling does this image relate to the most?",
        image: "assets/deer.jpg",
        buttonGroup: "button-group1",
        answer1: "Fear",
        answer2: "Joy",
        answer3: "Sadness"
    },
    {
        title: "Question 2",
        text: "What is your favorite color?",
        image: "assets/color.jpg",
        buttonGroup: "button-group2",
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
    }
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
        let json= generateJSON();
        alert(json);
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
}

function handleChoice2(choice) {
    answers[currentQuestionIndex + 1] = choice;
}

function handleChoice3(choice) {
    answers[currentQuestionIndex + 1] = choice;
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
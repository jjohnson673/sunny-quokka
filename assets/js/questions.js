
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('question-option'));
const scoretext = document.getElementById('score');
var timeleft = 15;
var timerID;


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = []
let secondsleft = 20;

let questions = [
    {
        question: "When inserting Java Script into an HTML page, what is the proper tag used?",
        choice1: "<js>",
        choice2: "<javascript>",
        choice3: "<script>",
        choice4: "<.js>",
        answer: 3,
    },
    {
        question: "How do you start a FOR loop?",
        choice1: "for=(i=0); (i<=9)",
        choice2: "for (i=0;i<=9;i++)",
        choice3: "for (i>=9;i++)",
        choice4: "for i=0, i<=9;i++",
        answer: 2,
    },
    {
        question: "Where is the correct place to insert Javascript?",
        choice1: "Below </html>",
        choice2: "Only the <body> section",
        choice3: "Only the <head> section",
        choice4: "Both <body> and <head> sections are acceptable",
        answer: 4,
    },
    {
        question: "How do you create a function?",
        choice1: "function myFunction()",
        choice2: "function = myFunction()",
        choice3: "function = my.Function",
        choice4: "function=1.myFunction",
        answer: 1,
    },
    {
        question: "How do you write an array?",
        choice1: "var=cars ['truck', 'sedan', 'convertible', 'minivan']",
        choice2: "var cars = ['truck', 'sedan', 'convertible', 'minivan']",
        choice3: "cars var = ['truck', 'sedan', 'convertible', 'minivan']",
        choice4: "var cars ='truck', 'sedan', 'convertible', 'minivan'",
        answer: 2,
    },
];

//CONSTANTS - for each question answered correctly, will receive 20 points- only has 5 questions to complete
const CORRECT_BONUS = 20;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    timerID = setInterval(countdown, 1000);
    var elem = document.getElementById("timer");



// Timer function
function countdown () {
    if(timeleft == 0) {
        clearTimeout(timerID);
        gameEnd();
        } else {
            elem.innerHTML = timeleft;
            timeleft--;
        }
    }

function gameEnd() {
    clearInterval(timerID);
    var ShowQ = document.getElementById('question');
    showQ.style.display = "none"
    timerEl.style.display = "none"
    // show end screen
    // var endScreenEl = document.getElementById('finalscore');

    // show final score
    var finalScoreEl = document.getElementById('finalscore');
    finalScoreEl.textContent = timeLeft;
}
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        /* when all of the questions are answered or when the timer runs out, goes to submit highscore */
        return window.location.assign('endgame.html');
    }

    /* getting a random question until each question has been answered once */
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    /*gives a reference to each question choice option to determine if the correct answer was selected*/
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
/*takes the available questions array and removes the question that was previously answered */
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
    /*prevents the user from pre-maturely clicking while answers are loading */

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

    /* defines if the selected answer is the correct/incorrect answer */
        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS)
        }
        else {
            secondsleft -=2
        }

        selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});



incrementScore = num => {
    score += num;
    scoretext.innerText = score;
}


startGame();
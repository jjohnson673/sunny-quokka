const username = document.getElementById('username')
const Submitbutton = document.getElementById('submitbutton')
const finalscore = document.getElementById('finalscore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScore')) || []

const MAX_HIGH_SCORES = 5

finalscore.innerText = mostRecentScore;


//end game submit high score
submithighscore = e => {
    e.preventDefault ()

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    highScore.push(score)
//if score B is higher than score A, put score B above A
    highScore.sort((a, b) =>  b.score - a.score);
    highScore.splice(5);

    localStorage.setItem('highScore', JSON.stringify(highScore))
    window.location.assign('highscorepage.html')
};

//highscore list

const highScoresList = document.getElementById("highscore-list");
const highScore = JSON.parse(localStorage.getItem('highScore')) || [];
highScoresList.innerHTML = highScore
.map( score => {
    return'<li class="high-score">${score.name}-${score.score}</li>';
}).join("");




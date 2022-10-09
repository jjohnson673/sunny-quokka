const username = document.getElementById('username')
const Submitbutton = document.getElementById('submitbutton')
const finalscore = document.getElementById('finalscore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highscore = JSON.parse(localStorage.getItem('highscore')) || []

const MAX_HIGH_SCORES = 5

finalscore.innerText = mostRecentScore

/*ensures that the user implements their name before saving */
username.addEventListener('keyup' () => {
    Submitbutton.disabled = !username.value
})

savehighscore = e => {
    e.preventDefault ()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highscore.push(score)

    highscore.sort((a,b) => {
        return b.score - a.score
    })

    highscore.splice(5)

    localStorage.setItem('highscore', JSON.stringify(highscore))
    window.location.assign('/')
}


const highScoreList = document.querySelector(#highscore-list)
const highScores = JSON.parse(localStorage.getItem('highScores')) || []


highScoreList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}) .join('')
const startBtn = document.querySelector ('#start')
const screens = document.querySelectorAll ('.screen')
const TimeList = document.querySelector ('#time-list')
const timeEl = document.querySelector ('#time')
const board = document.querySelector ('#board')
const colors = ['#9c2422','#063beb','#219c2d','#e0bd2b','#a63aa0','#38df28','#e25a10','#1ecdc8']
const playagain = document.querySelector('.time_btn1')
const TimeEnd = document.querySelector('.hidden')
const scoreEl = document.querySelector('#score')
let gameInterval;
let time = 0
let score = 0


const handleStart = (event) => {
    event.preventDefault()
    screens[1].scrollIntoView({ behavior: 'smooth'})
    TimeEnd.classList.add('hidden_active')
     
}
startBtn.addEventListener ('click', handleStart) 

const handlePlayAgain = (event) => {
    screens[1].scrollIntoView({ behavior: 'smooth'})
    playagain.parentNode.classList.remove('result_active')
    setTime(time)
    score = 0;
}
playagain.addEventListener('click', handlePlayAgain)

const handleTimelist =(event) => {
    if (event.target.classList.contains ('time-btn')) {
       time = parseInt(event.target.getAttribute ('data-time'))
       screens[2].scrollIntoView({ behavior: 'smooth'})
       startGame ()
    } 
}
TimeList.addEventListener('click',handleTimelist )

const handleBoardClick = (event) => {
    if (event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
        
         
    }
}

function startGame() {
    board.addEventListener('click', handleBoardClick)
    gameInterval = setInterval(decreaseTime, 1000)
    createRandomCircle()
    
}
function decreaseTime() {
    if (time === 0 ) {
        finishGame()
        
    } else {
    let current = --time
    if (current <10) {
        current = `0${current}`
        }
    setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function setScore(value) {
    scoreEl.innerHTML = value
}

function finishGame () {
    clearInterval(gameInterval);
    document.querySelector('.circle').remove()
    playagain.parentNode.classList.add('result_active')
    board.removeEventListener('click', handleBoardClick);
    setScore(score);
    
}

function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber (0, width-size)
    const y = getRandomNumber (0, height-size)
    const color = getRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = color
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
    board.append(circle)
}

function getRandomColor () {
    return colors [Math.floor(Math.random () * colors.length)]
 }

function getRandomNumber (min,max) {
  return Math.round(Math.random() * (max-min)+min)
}
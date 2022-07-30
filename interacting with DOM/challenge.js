// variables for the lab
let counter = parseInt(document.querySelector('#counter').textContent)
let likeList = document.querySelector('ul')
const minusButton = document.querySelector('#minus')
const plusButton = document.querySelector('#plus')
const heartButton = document.querySelector('#heart')
const pauseButton = document.querySelector('#pause')
const submitButton = document.querySelector('#submit')
const comments = document.querySelector('#list')
const form = document.querySelector('#comment-form')


//post comment and appear on page
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let newComment = document.createElement('ul')
    comments.append(newComment)
    newComment.append(e.target[0].value)
    //debugger
})

//Increment counter by clicking plus
document.getElementById('plus').addEventListener('click', incrementCounter)
function incrementCounter(){
   let iCount = document.querySelector('#counter').textContent
   counter++
   iCount = counter   
}

//Decrement counter by clicking minus
document.getElementById('minus').addEventListener('click', decrementCounter)
function decrementCounter(){
    let iCount = document.querySelector('#counter').textContent
    counter--
    iCount = counter   
 }

//timer increment based on pause button text
document.addEventListener('DOMContentLoaded', (e) => {    
timer()
})
function timer(){
if (pauseButton.textContent === ' pause ') {
    counter++
    document.querySelector('#counter').textContent = counter
} else {
} 
setTimeout(timer, 1000)
} 

//pause and resume button function
pauseButton.addEventListener('click', (e) => {
if (pauseButton.textContent === ' pause ') {     
    pauseButton.textContent = ' resume '
    minusButton.disabled = true
    plusButton.disabled = true
    heartButton.disabled = true
    submitButton.disabled = true
} else {
    pauseButton.textContent = ' pause '
    minusButton.disabled = false
    plusButton.disabled = false
    heartButton.disabled = false
    submitButton.disabled = false
}})

//create and update new like comment
heartButton.addEventListener('click', (e) => {
if (document.querySelector(`[data-num="${counter.toString()}"]`) === null) {
let newLike = document.createElement('li')
let newSpan = document.createElement('span')
newLike.dataset.num = `${counter}`
newLike.textContent = `${counter} has been liked `
newSpan.textContent = '1'
newLike.append(newSpan)
likeList.append(newLike)
time();
} else {
    document.querySelector(`[data-num="${counter.toString()}"]`).children[0].textContent = parseInt(document.querySelector(`[data-num="${counter.toString()}"]`).children[0].textContent, 10) + 1
    times();
}   
})

function time() {
    if (document.querySelector(`[data-num="${counter.toString()}"]`).children[0].textContent === '1') {
        document.querySelector(`[data-num="${counter.toString()}"]`).insertAdjacentText('beforeend', ' time')
    } 
}

function times() {
    if (parseInt(document.querySelector(`[data-num="${counter.toString()}"]`).children[0].textContent, 10) > 1 && document.querySelector(`[data-num="${counter.toString()}"]`).textContent.charAt(document.querySelector(`[data-num="${counter.toString()}"]`).textContent.length-1) != 's') {
        document.querySelector(`[data-num="${counter.toString()}"]`).insertAdjacentText('beforeend', 's')
    }
}
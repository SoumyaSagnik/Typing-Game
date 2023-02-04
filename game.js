const API_URL = "https://api.quotable.io/random";
const body = document.querySelector("body");
const content = document.querySelector(".content");
const typingSpace = document.querySelector(".input");
const timer = document.querySelector(".timer");
let startTime;

typingSpace.addEventListener('input', () => {
    const contentArray = content.querySelectorAll('span');
    const inputArray = typingSpace.value.split('');
    let correct = true;

    contentArray.forEach((charSpan, index) => {
        const char = inputArray[index];
        if (char == null) {
            charSpan.classList.remove("incorrect");
            charSpan.classList.remove("correct");
            correct = false;
        }
        else if (char === charSpan.innerText) {
            charSpan.classList.add("correct");
            charSpan.classList.remove("incorrect");
        } else {
            charSpan.classList.add("incorrect");
            charSpan.classList.remove("correct");
            correct = false;
        }
    })

    if (correct) {
        displayTick();
        setTimeout(function () {
            renderNewQuote();
            removeTick();
        }, 1500);
    }
})

function fetchQuote() {
    return fetch(API_URL)
        .then((response) => response.json())
        .then((data) => data.content);
}

async function renderNewQuote() {
    const quote = await fetchQuote();
    content.innerHTML = "";
    quote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        content.appendChild(charSpan)
    })
    typingSpace.value = null;
    startTimer();
}

function startTimer() {
    timer.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = getTimerTime();
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

function displayTick() {
    const animContainer = document.createElement('div');
    animContainer.classList.add('tick-animation');
    animContainer.innerHTML = "<lottie-player src='./tick.json'background='transparent' speed='1' style='width: 5rem; height: 5rem;'autoplay></lottie-player>";
    body.appendChild(animContainer);
}

function removeTick() {
    document.querySelector('.tick-animation').remove();
}

renderNewQuote();

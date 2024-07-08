//let isRunning = false;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start-25').addEventListener('click', () => startTimer(25));
    document.getElementById('start-5').addEventListener('click', () => startTimer(5));
    document.getElementById('start-15').addEventListener('click', () => startTimer(15));
});

function startTimer(minutes) {
    //removed isRunning check
    chrome.runtime.sendMessage({ type: 'clearTimer' }, (response) => {
        console.log(response.status);
    });
    
    //isRunning = true;
    chrome.runtime.sendMessage({ type: 'startTimer', minutes: minutes }, (response) => {
        if (response.status === 'timerStarted') {
            startCountdown(minutes * 60);
        } else {
            console.error('Failed to start timer.');
        }
        //console.log(response.status);
        //displayTime(minutes * 60);
        //startCountdown(minutes * 60);
    });
}

function startCountdown(duration) {
    let time = duration;
    const countdownInterval = setInterval(() => {
        time--;
        displayTime(time);
        if (time <= 0) {
            clearInterval(countdownInterval);
            alert("Time's up!");
        }
    }, 1000);
}

function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    document.getElementById('timer-display').textContent = display;
}

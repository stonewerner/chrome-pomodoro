let timer;
let isRunning = false;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start-25').addEventListener('click', () => startTimer(25));
    document.getElementById('start-5').addEventListener('click', () => startTimer(5));
    document.getElementById('start-15').addEventListener('click', () => startTimer(15));
});

function startTimer(minutes) {
    if (isRunning) {
        clearInterval(timer);
    }
    isRunning = true;
    let time = minutes * 60;
    displayTime(time);

    timer = setInterval(() => {
        time--;
        displayTime(time);
        if (time <= 0) {
            clearInterval(timer);
            isRunning = false;
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

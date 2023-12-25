let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;
const maxLaps = 10; 

function start() {
    if (!isRunning) {
        startTime = new Date().getTime() - elapsedTime;
        timer = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function pause() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    lapCounter = 1;
    updateDisplay();
    document.getElementById('lapList').innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = new Date().getTime() - startTime;
        const formattedTime = formatTime(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${formattedTime}`;
        document.getElementById('lapList').appendChild(lapItem);
        lapCounter++;

       
        if (lapCounter > maxLaps) {
            document.getElementById('laps-container').style.overflowY = 'scroll';
        }
    }
}

function updateTime() {
    const currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;
    updateDisplay();
}

function updateDisplay() {
    const formattedTime = formatTime(elapsedTime);
    document.querySelector('.display').textContent = formattedTime;
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const millisecondsStr = date.getUTCMilliseconds().toString().padStart(3, '0').slice(0, 2);
    return `${hours}:${minutes}:${seconds}:${millisecondsStr}`;
}




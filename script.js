let timer;
let isRunning = false;
let startTime;
let lapNumber = 0;

function startStop() {
  if (!isRunning) {
    isRunning = true;
    startTime = new Date().getTime();
    timer = setInterval(updateDisplay, 10);
    document.getElementById('startStop').textContent = 'Stop';
    document.getElementById('lapReset').textContent = 'Lap';
  } else {
    isRunning = false;
    clearInterval(timer);
    document.getElementById('startStop').textContent = 'Start';
    document.getElementById('lapReset').textContent = 'Reset';
  }
}

function lapReset() {
  if (isRunning) {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    addLap(elapsedTime);
  } else {
    reset();
  }
}

function updateDisplay() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  const displayTime = formatTime(elapsedTime);
  document.getElementById('display').textContent = displayTime;
}

function formatTime(time) {
  const minutes = Math.floor(time / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(value) {
  return value < 10 ? '0' + value : value;
}

function addLap(time) {
  lapNumber++;
  const lapTime = formatTime(time);
  const lapItem = document.createElement('li');
  lapItem.classList.add('lapItem');
  lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
  document.getElementById('laps').appendChild(lapItem);
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  lapNumber = 0;
  document.getElementById('display').textContent = '00:00:00';
  document.getElementById('laps').innerHTML = '';
  document.getElementById('startStop').textContent = 'Start';
  document.getElementById('lapReset').textContent = 'Lap';
}

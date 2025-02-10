let timeLeft;
let timerId = null;
let isWorkMode = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const toggleButton = document.getElementById('toggle-mode');
const modal = document.getElementById('goal-modal');
const goalInput = document.getElementById('goal-input');
const submitGoal = document.getElementById('submit-goal');
const goalDisplay = document.getElementById('goal-display');
const addTimeButton = document.getElementById('add-time');

function showGoalModal() {
    modal.style.display = 'block';
    goalInput.focus();
}

function hideGoalModal() {
    modal.style.display = 'none';
    goalInput.value = '';
}

function handleGoalSubmit() {
    const goal = goalInput.value.trim();
    if (goal) {
        goalDisplay.textContent = `Current Goal: ${goal}`;
        hideGoalModal();
        startTimer();
    }
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update page title with timer
    document.title = `${timeString} - Pomodoro Timer`;
}

function startTimer() {
    if (timerId === null) {
        if (isWorkMode && !goalDisplay.textContent) {
            showGoalModal();
            return;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                const buzzer = document.getElementById('buzzer');
                buzzer.play();
                setTimeout(() => {
                    alert(isWorkMode ? 'Work session completed! Take a break!' : 'Break is over! Back to work!');
                }, 500);
                resetTimer();
                if (!isWorkMode) {
                    goalDisplay.textContent = ''; // Clear goal when break is over
                }
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    updateDisplay();
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    toggleButton.textContent = isWorkMode ? '🔥' : '💧';
    
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
    
    resetTimer();
    goalDisplay.textContent = ''; // Clear goal when switching modes
}

function addFiveMinutes() {
    timeLeft += 5 * 60; // Add 300 seconds (5 minutes)
    updateDisplay();
}

// Initialize
timeLeft = 25 * 60;
updateDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', toggleMode);
submitGoal.addEventListener('click', handleGoalSubmit);
goalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleGoalSubmit();
    }
});
addTimeButton.addEventListener('click', addFiveMinutes); 
const resetButton = document.querySelector('.reset-button');
const secondHand = document.querySelector('.second-hand');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const hrs = document.querySelector('.hours');
const mins = document.querySelector('.minutes')
const secs = document.querySelector('.seconds');


// CREATE TIMER OBJECT
const timer = {
    secondCounter: 0,
    interval: undefined,

    startTimer() {
        this.interval = setInterval(() => {
            this.secondCounter++;
            this.convertTimeAndDisplay();
            }, 1000)
    },

    convertTimeAndDisplay() {
        // Convert seconds to real time
        let seconds = 0;
        let minutes = 0;
        let hours = 0;
        let totalTime = this.secondCounter;

        // Hours
        if (totalTime >= 3600) {
           hours = Math.floor(totalTime / 3600);
           totalTime = totalTime % 3600;
        }

        // Minutes
        if (totalTime >= 60) {
            minutes = Math.floor(totalTime / 60);
            totalTime = totalTime % 60;
        }

        // Seconds
        seconds = totalTime;

        // Display data
        hrs.innerHTML = formatTimeDisplay(hours);
        mins.innerHTML = formatTimeDisplay(minutes);
        secs.innerHTML = formatTimeDisplay(seconds);
    },


    stopTimer() {
        if (!this.interval) {
            return;
        }
        clearInterval(this.interval);
    },

    resetTimer() {
        this.stopTimer();
        this.secondCounter = 0;
        this.convertTimeAndDisplay();

    }

}


// START AND STOP ANIMATION
const startAnimation = () => {
    secondHand.classList.add('tick-animation');
}

const stopAnimation = () => {
    secondHand.classList.remove('tick-animation')
}


// FORMAT NUMBERS HELPER FUNCTION
function formatTimeDisplay(num) {
    return num.toString().padStart(2, '0');
}


// EVENT LISTENERS
startButton.addEventListener('click', () => {
    if (secondHand.style.animationPlayState === 'paused') {
        secondHand.style.animationPlayState = 'running';
    }
    startAnimation();
    timer.startTimer();

})

stopButton.addEventListener('click', () => {
    secondHand.style.animationPlayState = 'paused';
    timer.stopTimer();

})

resetButton.addEventListener('click', () => {
    stopAnimation();
    timer.resetTimer();
})

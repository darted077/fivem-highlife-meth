var currentPercentage = 50;
var currentLithium = 0;
var currentAcetone = 0;
var currentSulfuric = 0;

var totalCookTime = getRandomNumber(135, 145);
var firstIntervalLength = getRandomNumber(5, 15);
var elapsedCookTime = 0;
var desiredTemperature = 20;
var greenTime = 0;
var redTime = 0;

var hasHonked = false;
var isCooking = false;
var timerStarted = false;
var intervalIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    updateValueDisplay('percentage', currentPercentage);
    updateValueDisplay('lithium', currentLithium);
    updateValueDisplay('acetone', currentAcetone);
    updateValueDisplay('sulfuric', currentSulfuric);
});

document.addEventListener('keydown', function(event) {
    if (event.repeat) {
        return;
    }

    handleCookStartInput(event);
    handleCookingInput(event);
});

function handleCookingInput(event) {
    if(!hasHonked) {
        return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        changePercentage(event.key === 'ArrowUp' ? 5 : -5);
        updateValueDisplay('percentage', currentPercentage);
    }

    if (event.key === 'a' || event.key === 'A') {
        event.preventDefault();
        addLithium();
        updateValueDisplay('lithium', currentLithium)
        isCooking = evaluateIsCooking();
    }

    if (event.key === 's' || event.key === 'S') {
        event.preventDefault();
        addAcetone();
        updateValueDisplay('acetone', currentAcetone)
        isCooking = evaluateIsCooking();
    }

    if (event.key === 'd' || event.key === 'D') {
        event.preventDefault();
        addSulfuric();
        updateValueDisplay('sulfuric', currentSulfuric)
        isCooking = evaluateIsCooking();
    }

    if (!timerStarted && hasHonked && isCooking) {
        startTimer();
    }
}

function handleCookStartInput(event) {
    if(hasHonked) {
        return;
    }

    if (event.key === 'e' || event.key === 'E') {
        event.preventDefault();
        hasHonked = true;
        var startPanel = document.getElementById('start-panel');
        var controlPanel = document.getElementById('control-panel');
        var progress = document.getElementById('progress');

        startPanel.hidden = true;
        controlPanel.hidden = false;
        progress.hidden = false;
    }
}

function updateValueDisplay(id, newValue) {
    var element = document.getElementById(id);
    element.textContent = newValue;
}

function changePercentage(change) {
    currentPercentage = Math.max(0, Math.min(currentPercentage + change, 100));
}

function addLithium() {
    currentLithium = Math.min(currentLithium + 1, 5);
}

function addAcetone() {
    currentAcetone = Math.min(currentAcetone + 1, 4);
}

function addSulfuric() {
    currentSulfuric = Math.min(currentSulfuric + 1, 6);
}

function evaluateIsCooking() {
    if(!hasHonked) {
        return false;
    }

    if(currentLithium === 0 || currentAcetone === 0 || currentSulfuric === 0) {
        return false;
    }

    var noItemsText = document.getElementById('no-items-text');
    noItemsText.hidden = true;
    return true;
}

function evaluateTemperature() {
    if(!hasHonked || !isCooking) {
        return false;
    }

    var notRespondingElement = document.getElementById('not-responding-text');
    var respondingElement = document.getElementById('responding-text');

    if (currentPercentage === desiredTemperature || currentPercentage === desiredTemperature+5) {
        notRespondingElement.hidden = true;
        respondingElement.hidden = false;
        return true;
    } else {
        notRespondingElement.hidden = false;
        respondingElement.hidden = true;
        return false;
    }
}

function getRandomNumber(min, max) {
    var randomDecimal = Math.random();
    var randomInRange = randomDecimal * (max - min + 1) + min;
    var randomNumber = Math.floor(randomInRange);

    return randomNumber;
}

function getRandomNumberStepped(min, max, step, exclude) {
    var rangeSize = (max - min) / step + 1;
    var validValues = [];
    for (var i = 0; i < rangeSize; i++) {
        var value = min + i * step;
        if (value !== exclude) {
            validValues.push(value);
        }
    }
    var randomIndex = Math.floor(Math.random() * validValues.length);
    var randomNumber = validValues[randomIndex];

    return randomNumber;
}

function startTimer() {
    desiredTemperature = getRandomNumberStepped(5, 95, 5, 0);
    //console.log("Setting initial temp to "+desiredTemperature)
    var intervalId = setInterval(function() {
        elapsedCookTime += 0.05;

        if(evaluateTemperature()) {
            greenTime += 0.05;
        } else {
            redTime += 0.05;
        }

        if(intervalIndex === 0 && elapsedCookTime >= firstIntervalLength) {
            intervalIndex++;
            desiredTemperature = getRandomNumberStepped(Math.max(5, desiredTemperature - 25), Math.min(95, desiredTemperature + 25), 5, desiredTemperature);
            //console.log("Setting temp after first interval to "+desiredTemperature)
        }

        if(intervalIndex > 0 && elapsedCookTime >= intervalIndex * 12 + firstIntervalLength) {
            intervalIndex++;
            desiredTemperature = getRandomNumberStepped(Math.max(5, desiredTemperature - 25), Math.min(95, desiredTemperature + 25), 5, desiredTemperature);
            //console.log("Setting temp to "+desiredTemperature)
        }

        updateProgressBar();

        if (elapsedCookTime >= totalCookTime) {
            clearInterval(intervalId);
            hideEverything()
        }

        timerStarted = true;
    }, 50);
}

function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const progress = progressBar.querySelector('.progress');
    var emWidth = (elapsedCookTime / totalCookTime) * 100;
    progress.style.width = emWidth + "%";
}

function hideEverything() {
    var notRespondingElement = document.getElementById('not-responding-text');
    var respondingElement = document.getElementById('responding-text');
    var startPanel = document.getElementById('start-panel');
    var controlPanel = document.getElementById('control-panel');
    var progress = document.getElementById('progress');

    notRespondingElement.hidden = true;
    respondingElement.hidden = true;
    startPanel.hidden = true;
    controlPanel.hidden = true;
    progress.hidden = true;
}

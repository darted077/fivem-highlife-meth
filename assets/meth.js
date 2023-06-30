var currentPercentage = 50;
var currentLithium = 0;
var currentAcetone = 0;
var currentSulfuric = 0;

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

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        changePercentage(event.key === 'ArrowUp' ? 5 : -5);
        updateValueDisplay('percentage', currentPercentage);
    }

    if (event.key === 'a' || event.key === 'A') {
        event.preventDefault();
        addLithium();
        updateValueDisplay('lithium', currentLithium)
    }
});

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

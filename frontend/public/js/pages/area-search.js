function checkLatDeg(value) {
    value = Math.min(Math.max(parseInt(value), 0), 90);
    document.getElementById('latDegInput').value = isNaN(value) ? '' : value;
    var latMin = document.getElementById('latMinInput');
    if (value.toString() !== 'NaN' && value.toString().length === parseInt(document.getElementById('latDegInput').attributes["maxlength"].value)) {
        latMin.focus();
    }
    autoDraw();
}
function checkLatMin(value) {
    value = Math.min(Math.max(parseInt(value), 0), 59);
    document.getElementById('latMinInput').value = isNaN(value) ? '' : value;
    var latSec = document.getElementById('latSecInput');
    if (value.toString() !== 'NaN' && value.toString().length === parseInt(document.getElementById('latMinInput').attributes["maxlength"].value)) {
        latSec.focus();
    }
    autoDraw();
}
function checkLatSec(value) {
    if (!(value.charAt(value.length-1) == '.')) {
        if (value.split('.')[1]) {
            if (value.split('.')[1].length > 1) {
                document.getElementById('latSecInput').value = parseFloat(Math.floor(value*10))/10;
            }
        }
        value = Math.min(Math.max(parseFloat(value), 0), 59.9);
        document.getElementById('latSecInput').value = isNaN(value) ? '' : value;
    } else if (value.includes('..') || (value.includes('...'))) {
        value = value.replace('...', '..');
        value = value.replace('..', '.');
        document.getElementById('latSecInput').value = value
    }
    var lonDeg = document.getElementById('lonDegInput');
    if (value.toString() !== 'NaN' && value.toString().length === parseInt(document.getElementById('latSecInput').attributes["maxlength"].value)) {
        lonDeg.focus();
    }
    autoDraw();
}
function checkLonDeg(value) {
    value = Math.min(Math.max(parseInt(value), 0), 180);
    document.getElementById('lonDegInput').value = isNaN(value) ? '' : value;
    var lonMin = document.getElementById('lonMinInput');
    if (value.toString() !== 'NaN' && value.toString().length === parseInt(document.getElementById('lonDegInput').attributes["maxlength"].value)) {
        lonMin.focus();
    }
    autoDraw();
}
function checkLonMin(value) {
    value = Math.min(Math.max(parseInt(value), 0), 59);
    document.getElementById('lonMinInput').value = isNaN(value) ? '' : value;
    var lonSec = document.getElementById('lonSecInput');
    if (value.toString() !== 'NaN' && value.toString().length === parseInt(document.getElementById('lonMinInput').attributes["maxlength"].value)) {
        lonSec.focus();
    }
    autoDraw();
}
function checkLonSec(value) {
    if (!(value.charAt(value.length-1) == '.')) {
        if (value.split('.')[1]) {
            if (value.split('.')[1].length > 1) {
                document.getElementById('lonSecInput').value = parseFloat(Math.floor(value*10))/10;
            }
        }
        value = Math.min(Math.max(parseFloat(value), 0), 59.9);
        document.getElementById('lonSecInput').value = isNaN(value) ? '' : value;
    } else if (value.includes('..') || (value.includes('...'))) {
        value = value.replace('...', '..');
        value = value.replace('..', '.');
        document.getElementById('lonSecInput').value = value
    }
    autoDraw();
}

function autoDraw() {
    const postalCodeTab = document.getElementById('pills-postalcode-tab');
    const coordinatesTab = document.getElementById('pills-coordinates-tab');
    if (postalCodeTab.classList.contains('active')) {
        var postalCodeInput = document.getElementById('postalCodeInput').value;
        if (postalCodeInput.length == 7) {
            postalCodeCircle();
        } else if (postalCodeInput.replace(' ','').replace('-','').length == 6) {
            document.getElementById('postalCodeError').innerHTML = 'Please input a BC Postal Code in the format: A1A 1A1';
        }
    } else if (coordinatesTab.classList.contains('active')) {
        var lonDeg = document.getElementById('lonDegInput').value;
        var lonMin = document.getElementById('lonMinInput').value;
        var lonSec = document.getElementById('lonSecInput').value;
        var latDeg = document.getElementById('latDegInput').value;
        var latMin = document.getElementById('latMinInput').value;
        var latSec = document.getElementById('latSecInput').value;
        var latLonArray = [lonDeg, lonMin, lonSec, latDeg, latMin, latSec];
        var draw = true;

        for (let value of latLonArray) {
            if(value == 'NaN' || value == '' || (value.charAt(value.length-1) == '.')) {
                draw = false;
            }
        }
        if (draw) {
            coordinateCircle();
        }
    }
}

var postalCodeInputEl = document.getElementById('postalCodeInput');
var lonDeg = document.getElementById('lonDegInput');
var lonMin = document.getElementById('lonMinInput');
var lonSec = document.getElementById('lonSecInput');
var latDeg = document.getElementById('latDegInput');
var latMin = document.getElementById('latMinInput');
var latSec = document.getElementById('latSecInput');
var sizeSmall = document.getElementById('sizeSmall');
var sizeLarge = document.getElementById('sizeLarge');

postalCodeInputEl.addEventListener('input', autoDraw);
latDeg.addEventListener('input', function () { checkLatDeg(this.value); });
latMin.addEventListener('input', function () { checkLatMin(this.value); });
latSec.addEventListener('input', function () { checkLatSec(this.value); });
lonDeg.addEventListener('input', function () { checkLonDeg(this.value); });
lonMin.addEventListener('input', function () { checkLonMin(this.value); });
lonSec.addEventListener('input', function () { checkLonSec(this.value); });
sizeSmall.addEventListener('change', autoDraw);
sizeLarge.addEventListener('change', autoDraw);

latMin.addEventListener('keydown', ({key}) => {
    if (key === 'Backspace' && (latMin.value.toString().length == 'NaN' || latMin.value.toString().length === 0)) {
        latDeg.focus();
        event.preventDefault();
    }
});
latSec.addEventListener('keydown', ({key}) => {
    if (key === 'Backspace' && (latSec.value.toString().length == 'NaN' || latSec.value.toString().length === 0)) {
        latMin.focus();
        event.preventDefault();
    }
});
lonDeg.addEventListener('keydown', ({key}) => {
    if (key === 'Backspace' && (lonDeg.value.toString().length == 'NaN' || lonDeg.value.toString().length === 0)) {
        latSec.focus();
        event.preventDefault();
    }
});
lonMin.addEventListener('keydown', ({key}) => {
    if (key === 'Backspace' && (lonMin.value.toString().length == 'NaN' || lonMin.value.toString().length === 0)) {
        lonDeg.focus();
        event.preventDefault();
    }
});
lonSec.addEventListener('keydown', ({key}) => {
    if (key === 'Backspace' && (lonSec.value.toString().length == 'NaN' || lonSec.value.toString().length === 0)) {
        lonMin.focus();
        event.preventDefault();
    }
});

document.getElementById('searchButton').addEventListener('click', searchArea);

// utility functions
async function testapi() {
  fetch('/site-registry/test', {
    method: 'GET',
    responseType: 'application/json',
  })
    .then((res) => res.json())
    .then((resJson) => console.log(resJson));
}

function back() {
  window.history.go(-1);
}

function areaDisplay() {
  var postalCodeTab = document.getElementById('pills-postalcode');
  var coordinatesTab = document.getElementById('pills-coordinates');
  if (postalCodeTab.classList.contains('active')) {
    postalCodeCircle();
  } else if (coordinatesTab.classList.contains('active')) {
    coordinateCircle();
  }
}

async function searchPid() {
  var parcelId = document.getElementById('parcelId').value;
  localStorage.setItem('searchType', 'pid');
  localStorage.setItem('searchCriteria', parcelId);
  localStorage.setItem('searchCriteria2', '');
  window.location.href = '/view-search-results';
}

async function searchCLP() {
  var crownLandsPin = document.getElementById('crownLandsPin').value;
  localStorage.setItem('searchType', 'clp');
  localStorage.setItem('searchCriteria', crownLandsPin);
  localStorage.setItem('searchCriteria2', '');
  window.location.href = '/view-search-results';
}

async function searchCLF() {
  var crownLandsFile = document.getElementById('crownLandsFile').value;
  localStorage.setItem('searchType', 'clf');
  localStorage.setItem('searchCriteria', crownLandsFile);
  localStorage.setItem('searchCriteria2', '');
  window.location.href = '/view-search-results';
}

async function searchSiteId() {
  var siteId = document.getElementById('siteId').value;
  localStorage.setItem('searchType', 'sid');
  localStorage.setItem('searchCriteria', siteId);
  localStorage.setItem('searchCriteria2', '');
  window.location.href = '/view-search-results';
}

async function searchAddress() {
  var address = document.getElementById('address').value;
  var city = document.getElementById('city').value;
  localStorage.setItem('searchType', 'adr');
  localStorage.setItem('searchCriteria', address);
  localStorage.setItem('searchCriteria2', city);
  window.location.href = '/view-search-results';
}

async function searchArea() {
  if (checkAreaSearchInputs()) {
    const size = document.getElementById('sizeSmall').checked
      ? 'Small'
      : document.getElementById('sizeLarge').checked
      ? 'Large'
      : '';
    var postalCodeTab = document.getElementById('pills-postalcode');
    var coordinatesTab = document.getElementById('pills-coordinates');
    const latLon = getLatLon();
    if (postalCodeTab.classList.contains('active')) {
      localStorage.setItem('searchType', 'postal');
      localStorage.setItem('postalCode', document.getElementById('postalCodeInput').value);
    } else if (coordinatesTab.classList.contains('active')) {
      const dms = getDMS(latLon.lat, latLon.lon);
      localStorage.setItem('searchType', 'coords');
      localStorage.setItem('latDms', dms.latDeg + 'deg ' + dms.latMin + 'min ' + dms.latSec + 'sec');
      localStorage.setItem('lonDms', dms.lonDeg + 'deg ' + dms.lonMin + 'min ' + dms.lonSec + 'sec');
    }
    localStorage.setItem('searchCriteria', latLon.lat.toFixed(5));
    localStorage.setItem('searchCriteria2', Math.abs(latLon.lon).toFixed(5));
    localStorage.setItem('searchCriteria3', size);

    window.location.href = '/view-search-results';
  }
}

function checkAreaSearchInputs() {
  var postalCodeTab = document.getElementById('pills-postalcode');
  let latLonArray = [];
  latLonArray.push(document.getElementById('latDegInput').value);
  latLonArray.push(document.getElementById('latMinInput').value);
  latLonArray.push(document.getElementById('latSecInput').value);
  latLonArray.push(document.getElementById('lonDegInput').value);
  latLonArray.push(document.getElementById('lonMinInput').value);
  latLonArray.push(document.getElementById('lonSecInput').value);
  for (let value of latLonArray) {
    if (value.length == 0) {
      return false;
    }
  }
  if (postalCodeTab.classList.contains('active')) {
    if (document.getElementById('postalCodeInput').value.length !== 6) {
      return false;
    }
  }
  return true;
}

async function getPdf(siteId) {
  $(':button').prop('disabled', true);
  const reportType = document.getElementById(`reportType${siteId}`).value;
  if (reportType == 'synopsis' || reportType == 'detailed') {
    fetch(`/bc-registry/download-pdf/${reportType}/${siteId}`, {
      method: 'GET',
      // responseType: 'blob',
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'myreport' + Math.random() * 1000 + '.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        $(':button').prop('disabled', false);
      })
      .catch(() => alert('Something went wrong'));
  } else {
    alert('Please select a Report Type');
  }
}

async function emailPdf(siteId) {
  $(':button').prop('disabled', true);
  const reportType = document.getElementById(`reportType${siteId}`).value;
  if (reportType == 'synopsis' || reportType == 'detailed') {
    let email = prompt('Please enter your Email Address');
    email = email !== null ? email : '';
    if (email.match(/^\S+@\S+\.\S+$/) !== null) {
      fetch(`/bc-registry/email-pdf/${reportType}/${encodeURI(email)}/${siteId}`, {
        method: 'GET',
        responseType: 'application/json',
      })
        .then((res) => res.json())
        .then((resJson) => {
          alert(resJson.message);
          $(':button').prop('disabled', false);
        })
        .catch(() => {
          alert('Something went wrong');
          $(':button').prop('disabled', false);
        });
    } else {
      alert('Please enter a valid email');
      $(':button').prop('disabled', false);
    }
  } else {
    alert('Please select a Report Type');
    $(':button').prop('disabled', false);
  }
}

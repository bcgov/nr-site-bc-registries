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

async function requestPdfDownload(siteId) {
  $(':button').prop('disabled', true);
  const statusCode = await createInvoice();
  if (statusCode == ('APPROVED' || 'PAID' || 'COMPLETED')) {
    getPdf(siteId);
  } else {
    alert('Not yet paid');
  }
  await delay(5);
  $(':button').prop('disabled', false);
}

async function requestPdfEmail(siteId) {
  $(':button').prop('disabled', true);
  const statusCode = await createInvoice();
  if (statusCode == ('APPROVED' || 'PAID' || 'COMPLETED')) {
    emailPdf(siteId);
  } else {
    alert('Not yet paid');
  }
  $(':button').prop('disabled', false);
}

// wait for n seconds
function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000);
  });
}

async function getPdf(siteId) {
  const reportType = document.getElementById(`reportType${siteId}`).value;
  if (reportType == 'synopsis' || reportType == 'detailed') {
    var req = new XMLHttpRequest();
    req.open('GET', `/bc-registry/download-pdf/${reportType}/${siteId}`, true);
    req.responseType = 'blob';
    req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        var filename = 'PdfName-' + new Date().getTime() + '.pdf';
        if (typeof window.chrome !== 'undefined') {
          // Chrome version
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(req.response);
          link.download = 'PdfName-' + new Date().getTime() + '.pdf';
          link.click();
        } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
          // IE version
          var blob = new Blob([req.response], {
            type: 'application/pdf',
          });
          window.navigator.msSaveBlob(blob, filename);
        } else {
          // Firefox version
          var file = new File([req.response], filename, {
            type: 'application/force-download',
          });
          window.open(URL.createObjectURL(file));
        }
      }
    };
    req.send();
  } else {
    alert('Please select a Report Type');
  }
}

function emailPdf(siteId) {
  const reportType = document.getElementById(`reportType${siteId}`).value;
  if (reportType == 'synopsis' || reportType == 'detailed') {
    var url = '/bc-registry/email-pdf';
    let email = prompt('Please enter your Email Address');
    var params = `/${reportType}/${email}/${siteId}`;
    var req = new XMLHttpRequest();
    req.open('GET', url + params, true);
    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
        alert(req.responseText);
      }
    };
    req.send();
  } else {
    alert('Please select a Report Type');
  }
}

async function createInvoice() {
  const response = await fetch(`/pay/createinvoice/`, {
    method: 'GET',
    responseType: 'application/json',
  }).then((res) => res.json());
  return response.statusCode;
}

function getAccessCode() {
  var url = new URL(window.location.href);
  var accessCode = url.searchParams.get('accessCodeVariableName');
  // do something with access code
}

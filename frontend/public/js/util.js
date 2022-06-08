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
  const size = document.getElementById('sizeSmall').checked
    ? 'Small'
    : document.getElementById('sizeLarge').checked
    ? 'Large'
    : '';
  const lat = document.getElementById('latitudeInput').value;
  const lng = Math.abs(document.getElementById('longitudeInput').value); // remove the minus sign if it exists
  localStorage.setItem('searchType', 'coords');
  localStorage.setItem('searchCriteria', lat);
  localStorage.setItem('searchCriteria2', lng);
  localStorage.setItem('searchCriteria3', size);
  window.location.href = '/view-search-results';
}

async function requestPdfDownload(siteId) {
  $(':button').prop('disabled', true);
  const statusCode = await createInvoice();
  if (statusCode == ('APPROVED' || 'PAID' || 'COMPLETED')) {
    getPdf(siteId);
  } else {
    alert('Not yet paid');
  }
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

function getPdf(siteId) {
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

async function finishAuthentication() {
  var url = new URL(window.location.href);
  var code = url.searchParams.get('code');

  await fetch(`/authentication`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ code: code }),
  })
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
}

function countdown() {
  seconds = document.getElementById('countdown').innerHTML - 1;
  if (seconds < 0) {
    // Chnage your redirection link here
    window.location.assign('../');
  } else {
    // Update remaining seconds
    // Count down using javascript
    window.setTimeout(`countdown()`, 1000);
    document.getElementById('countdown').innerHTML = seconds;
  }
}

function getAccessCode() {
  var url = new URL(window.location.href);
  var accessCode = url.searchParams.get('accessCodeVariableName');
  // do something with access code
}

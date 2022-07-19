// utility functions
function back() {
  window.history.go(-1);
}

async function searchPid() {
  var parcelId = document.getElementById('parcelId').value;
  localStorage.setItem('searchType', 'pid');
  localStorage.setItem('searchCriteria', parcelId);
  localStorage.setItem('searchCriteria2', '');
  if (parcelId !== '') {
    const url = `/site-registry/searchPid/${parcelId}`;
    await getSearchResults(url);
  } else {
    alert('Please enter a Parcel ID');
  }
}

async function searchCLP() {
  var crownLandsPin = document.getElementById('crownLandsPin').value;
  localStorage.setItem('searchType', 'clp');
  localStorage.setItem('searchCriteria', crownLandsPin);
  localStorage.setItem('searchCriteria2', '');
  if (crownLandsPin !== '') {
    const url = `/site-registry/searchCLP/${crownLandsPin}`;
    await getSearchResults(url);
  } else {
    alert('Please enter a Crown Lands PIN');
  }
}

async function searchCLF() {
  var crownLandsFile = document.getElementById('crownLandsFile').value;
  localStorage.setItem('searchType', 'clf');
  localStorage.setItem('searchCriteria', crownLandsFile);
  localStorage.setItem('searchCriteria2', '');
  if (crownLandsFile !== '') {
    const url = `/site-registry/searchCLF/${encodeURIComponent(crownLandsFile)}`;
    await getSearchResults(url);
  } else {
    alert('Please enter a Crown Lands File Number');
  }
}

async function searchSiteId() {
  var siteId = document.getElementById('siteId').value;
  localStorage.setItem('searchType', 'sid');
  localStorage.setItem('searchCriteria', siteId);
  localStorage.setItem('searchCriteria2', '');
  if (siteId !== '') {
    const url = `/site-registry/searchSiteId/${siteId}`;
    await getSearchResults(url);
  } else {
    alert('Please enter a site Id');
  }
}

async function searchAddress() {
  var address = document.getElementById('address').value;
  var city = document.getElementById('city').value;
  localStorage.setItem('searchType', 'adr');
  localStorage.setItem('searchCriteria', address);
  localStorage.setItem('searchCriteria2', city);
  if (city.length >= 2 && city.replace(/\*/g, '').length >= 2) {
    const url = `/site-registry/searchAddr`;
    await postSearchResults(url, { city: city, address: address });
  } else {
    alert('Please provide at least two characters in the City input box');
  }
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
      if (
        /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(
          document.getElementById('postalCodeInput').value
        )
      ) {
        localStorage.setItem('searchType', 'postal');
        localStorage.setItem('postalCode', document.getElementById('postalCodeInput').value);
      } else {
        alert('Please input a valid Postal Code');
      }
    } else if (coordinatesTab.classList.contains('active')) {
      const dms = getDMS(latLon.lat, latLon.lon);
      localStorage.setItem('searchType', 'coords');
      localStorage.setItem('latDms', dms.latDeg + 'deg ' + dms.latMin + 'min ' + dms.latSec + 'sec');
      localStorage.setItem('lonDms', dms.lonDeg + 'deg ' + dms.lonMin + 'min ' + dms.lonSec + 'sec');
    }
    const lat = latLon.lat.toFixed(5);
    const lon = Math.abs(latLon.lon).toFixed(5);
    localStorage.setItem('searchCriteria', latLon.lat.toFixed(5));
    localStorage.setItem('searchCriteria2', Math.abs(latLon.lon).toFixed(5));
    localStorage.setItem('searchCriteria3', size);

    const url = `/site-registry/searchArea`;
    await postSearchResults(url, { lat: lat, lng: lon, size: size });
  }
}

async function getSearchResults(url) {
  fetch(url, {
    method: 'GET',
    responseType: 'application/json',
  })
    .then((res) => res.json())
    .then((resJson) => {
      if (!resJson.error) {
        localStorage.setItem('searchResults', JSON.stringify(resJson));
        window.location.href = '/view-search-results';
      } else {
        alert('Error with payment: ' + resJson.error);
      }
    })
    .catch(() => {
      alert('Something went wrong');
    });
}

async function postSearchResults(url, data) {
  fetch(url, {
    method: 'POST',
    responseType: 'application/json',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((resJson) => {
      if (!resJson.error) {
        localStorage.setItem('searchResults', JSON.stringify(resJson));
        window.location.href = '/view-search-results';
      } else {
        alert('Error with payment: ' + resJson.error);
      }
    })
    .catch(() => {
      alert('Something went wrong');
    });
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
    if (document.getElementById('postalCodeInput').value.replace('-', '').replace(' ', '').length !== 6) {
      return false;
    }
  }
  return true;
}
async function getPdfSynopsis() {
  const siteId = document.getElementById('siteId').value;
  $(':button').prop('disabled', true);
  displaySynDownloadSpinner();
  fetch(`/bc-registry/download-pdf2/synopsis/${siteId}`, {
    method: 'GET',
  })
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'synopsis-report_siteid-' + parseInt(siteId) + '.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      hideSynDownloadSpinner();
      $(':button').prop('disabled', false);
    })
    .catch(() => {
      alert('Something went wrong');
      hideSynDownloadSpinner();
      $(':button').prop('disabled', false);
    });
}
async function getPdfDetailed() {
  const siteId = document.getElementById('siteId').value;
  $(':button').prop('disabled', true);
  displayDetDownloadSpinner();
  fetch(`/bc-registry/download-pdf2/detailed/${siteId}`, {
    method: 'GET',
  })
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'detailed-report_siteid-' + parseInt(siteId) + '.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      hideDetDownloadSpinner();
      $(':button').prop('disabled', false);
    })
    .catch(() => {
      alert('Something went wrong');
      hideDetDownloadSpinner();
      $(':button').prop('disabled', false);
    });
}

async function getPdf(siteId) {
  const reportType = document.getElementById(`reportType${siteId}`).value;
  if (reportType == 'synopsis' || reportType == 'detailed') {
    $(':button').prop('disabled', true);
    displayDownloadSpinner(siteId);
    fetch(`/bc-registry/download-pdf/${reportType}/${siteId}`, {
      method: 'GET',
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = reportType + '-report_siteid-' + parseInt(siteId) + '.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        hideDownloadSpinner(siteId);
        $(':button').prop('disabled', false);
      })
      .catch(() => {
        alert('Something went wrong');
        hideDownloadSpinner(siteId);
        $(':button').prop('disabled', false);
      });
  } else {
    alert('Please select a Report Type');
  }
}

async function emailPdf(siteId) {
  const reportType = document.getElementById(`reportType${siteId}`).value;
  if (reportType == 'synopsis' || reportType == 'detailed') {
    $(':button').prop('disabled', true);
    displayEmailSpinner(siteId);
    let email = prompt('Please enter your email address');
    email = email !== null ? email : '';
    if (email.match(/^\S+@\S+\.\S+$/) !== null) {
      fetch(`/bc-registry/email-pdf/${reportType}/${encodeURI(email)}/${siteId}`, {
        method: 'GET',
        responseType: 'application/json',
      })
        .then((res) => res.json())
        .then((resJson) => {
          alert(resJson.message);
          hideEmailSpinner(siteId);
          $(':button').prop('disabled', false);
        })
        .catch(() => {
          alert('Something went wrong');
          hideEmailSpinner(siteId);
          $(':button').prop('disabled', false);
        });
    } else {
      alert('Please enter a valid email');
      hideEmailSpinner(siteId);
      $(':button').prop('disabled', false);
    }
  } else {
    alert('Please select a Report Type');
  }
}

async function emailSearchResults() {
  $(':button').prop('disabled', true);
  const searchData = JSON.parse(localStorage.getItem('searchResults'));
  let email = prompt('Please enter your email address');
  email = email !== null ? email : '';
  if (email.match(/^\S+@\S+\.\S+$/) !== null) {
    const data = {
      email: email,
      searchData: searchData,
      searchInfo: getSearchInfo(),
    };
    fetch(`/bc-registry/email-search-results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'application/json',
      body: JSON.stringify(data),
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
}

function getSearchInfo() {
  let searchType = localStorage.getItem('searchType');
  let searchCriteria1;
  let searchCriteria2;
  let searchCriteria3;
  switch (searchType) {
    case 'pid': {
      searchType = 'Parcel ID';
      searchCriteria1 = 'Parcel ID: ' + localStorage.getItem('searchCriteria');
      searchCriteria2 = '';
      searchCriteria3 = '';
      break;
    }
    case 'clf': {
      searchType = 'Crown Lands File Number';
      searchCriteria1 = 'Crown Lands File Number: ' + localStorage.getItem('searchCriteria');
      searchCriteria2 = '';
      searchCriteria3 = '';
      break;
    }
    case 'clp': {
      searchType = 'Crown Lands PIN';
      searchCriteria1 = 'Crown Lands PIN: ' + localStorage.getItem('searchCriteria');
      searchCriteria2 = '';
      searchCriteria3 = '';
      break;
    }
    case 'sid': {
      searchType = 'Site ID';
      searchCriteria1 = 'Site ID: ' + localStorage.getItem('searchCriteria');
      searchCriteria2 = '';
      searchCriteria3 = '';
      break;
    }
    case 'adr': {
      searchType = 'Address';
      searchCriteria1 = 'Address: ' + localStorage.getItem('searchCriteria');
      searchCriteria2 = 'City: ' + localStorage.getItem('searchCriteria2');
      searchCriteria3 = '';
      break;
    }
    case 'coords': {
      searchType = 'Area';
      searchCriteria1 = 'Latitude: ' + localStorage.getItem('latDms');
      searchCriteria2 = 'Longitude: ' + localStorage.getItem('lonDms');
      searchCriteria3 = 'Area Size: ' + localStorage.getItem('searchCriteria3');
      break;
    }
    case 'postal': {
      searchType = 'Area';
      searchCriteria1 = 'Postal Code: ' + localStorage.getItem('postalCode');
      searchCriteria2 = 'Area Size: ' + localStorage.getItem('searchCriteria3');
      searchCriteria3 = '';
      break;
    }
  }
  return {
    searchType: searchType,
    searchCriteria1: searchCriteria1,
    searchCriteria2: searchCriteria2,
    searchCriteria3: searchCriteria3,
  };
}

async function getNilPdf() {
  let searchType = localStorage.getItem('searchType');
  let searchCriteria1;
  let searchCriteria2;
  let searchCriteria3;
  switch (searchType) {
    case 'pid': {
      searchCriteria1 = localStorage.getItem('searchCriteria');
      searchCriteria2 = 'null';
      searchCriteria3 = 'null';
      break;
    }
    case 'clf': {
      searchCriteria1 = localStorage.getItem('searchCriteria');
      searchCriteria2 = 'null';
      searchCriteria3 = 'null';
      break;
    }
    case 'clp': {
      searchCriteria1 = localStorage.getItem('searchCriteria');
      searchCriteria2 = 'null';
      searchCriteria3 = 'null';
      break;
    }
    case 'sid': {
      searchCriteria1 = localStorage.getItem('searchCriteria');
      searchCriteria2 = 'null';
      searchCriteria3 = 'null';
      break;
    }
    case 'adr': {
      searchCriteria1 = localStorage.getItem('searchCriteria');
      searchCriteria2 = localStorage.getItem('searchCriteria2');
      searchCriteria3 = 'null';
      break;
    }
    case 'coords': {
      searchCriteria1 = localStorage.getItem('latDms');
      searchCriteria2 = localStorage.getItem('lonDms');
      searchCriteria3 = localStorage.getItem('searchCriteria3') + ' Area';
      break;
    }
    case 'postal': {
      searchCriteria1 = localStorage.getItem('postalCode');
      searchCriteria2 = localStorage.getItem('searchCriteria3') + ' Area';
      searchCriteria3 = 'null';
      break;
    }
  }

  if (searchCriteria1 != undefined) {
    $(':button').prop('disabled', true);
    displayNilSpinner();
    fetch(
      `/bc-registry/nil-pdf/${searchType}/${encodeURI(searchCriteria1)}/${encodeURI(searchCriteria2)}/${encodeURI(
        searchCriteria3
      )}`,
      {
        method: 'GET',
      }
    )
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'nil-report.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        hideNilSpinner();
        $(':button').prop('disabled', false);
      })
      .catch(() => {
        alert('Something went wrong');
        hideNilSpinner();
        $(':button').prop('disabled', false);
      });
  }
}

function displayDownloadSpinner(siteId) {
  var buttonText = document.getElementById('downloadBtnTxt' + siteId);
  var spinner = document.getElementById('downloadSpinner' + siteId);
  spinner.classList.remove('d-none');
  buttonText.innerText = '';
}

function hideDownloadSpinner(siteId) {
  var buttonText = document.getElementById('downloadBtnTxt' + siteId);
  var spinner = document.getElementById('downloadSpinner' + siteId);
  if (!spinner.classList.contains('d-none')) {
    spinner.classList.add('d-none');
  }
  buttonText.innerText = 'Download';
}

function displayEmailSpinner(siteId) {
  var buttonText = document.getElementById('emailBtnTxt' + siteId);
  var spinner = document.getElementById('emailSpinner' + siteId);
  spinner.classList.remove('d-none');
  buttonText.innerText = '';
}

function hideEmailSpinner(siteId) {
  var buttonText = document.getElementById('emailBtnTxt' + siteId);
  var spinner = document.getElementById('emailSpinner' + siteId);
  if (!spinner.classList.contains('d-none')) {
    spinner.classList.add('d-none');
  }
  buttonText.innerText = 'Email';
}

function displayNilSpinner() {
  var buttonText = document.getElementById('nilBtnText');
  var spinner = document.getElementById('nilSpinner');
  spinner.classList.remove('d-none');
  buttonText.innerText = '';
}

function hideNilSpinner() {
  var buttonText = document.getElementById('nilBtnText');
  var spinner = document.getElementById('nilSpinner');
  if (!spinner.classList.contains('d-none')) {
    spinner.classList.add('d-none');
  }
  buttonText.innerText = 'Download Nil Search Report';
}

// site id search page
function displaySynDownloadSpinner() {
  var buttonText = document.getElementById('synopsisBtnText');
  var spinner = document.getElementById('downloadSpinnerSynopsis');
  spinner.classList.remove('d-none');
  buttonText.innerText = '';
}

function hideSynDownloadSpinner() {
  var buttonText = document.getElementById('synopsisBtnText');
  var spinner = document.getElementById('downloadSpinnerSynopsis');
  if (!spinner.classList.contains('d-none')) {
    spinner.classList.add('d-none');
  }
  buttonText.innerText = 'Download Synopsis Report';
}

function displayDetDownloadSpinner() {
  var buttonText = document.getElementById('detailedBtnText');
  var spinner = document.getElementById('downloadSpinnerDetailed');
  spinner.classList.remove('d-none');
  buttonText.innerText = '';
}

function hideDetDownloadSpinner() {
  var buttonText = document.getElementById('detailedBtnText');
  var spinner = document.getElementById('downloadSpinnerDetailed');
  if (!spinner.classList.contains('d-none')) {
    spinner.classList.add('d-none');
  }
  buttonText.innerText = 'Download Detailed Report';
}

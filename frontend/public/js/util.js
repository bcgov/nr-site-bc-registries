/* eslint-disable @typescript-eslint/no-unused-vars */
// utility functions
function back() {
  const urlPath = window.location.pathname;
  if (urlPath === '/view-search-results') {
    window.location.href = `/${localStorage.getItem('prevPage')}`;
  } else {
    window.location.href = '/';
  }
}

async function searchPid() {
  var parcelId = document.getElementById('parcelId').value;
  localStorage.setItem('searchType', 'pid');
  localStorage.setItem('searchCriteria', parcelId);
  localStorage.setItem('searchCriteria2', '');
  localStorage.setItem('lastSearchType', 'pid');
  localStorage.setItem('lastSearchCriteria', parcelId);
  if (parcelId !== '') {
    displayViewResultsSpinner();
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
  localStorage.setItem('lastSearchType', 'clp');
  localStorage.setItem('lastSearchCriteria', crownLandsPin);
  if (crownLandsPin !== '') {
    displayViewResultsSpinner();
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
  localStorage.setItem('lastSearchType', 'clf');
  localStorage.setItem('lastSearchCriteria', crownLandsFile);
  if (crownLandsFile !== '') {
    displayViewResultsSpinner();
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
  localStorage.setItem('lastSearchType', 'sid');
  localStorage.setItem('lastSearchCriteria', siteId);
  if (siteId !== '') {
    displaySiteIDSearchSpinner();
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
  localStorage.setItem('lastSearchType', 'adr');
  localStorage.setItem('lastSearchCriteria', address);
  localStorage.setItem('lastSearchCriteria2', city);
  if (city.length >= 2 && city.replace(/\*/g, '').length >= 2) {
    displayViewResultsSpinner();
    const url = `/site-registry/searchAddr`;
    await postSearchResults(url, { city: city, address: address });
  } else {
    alert('Please provide at least two characters in the City input box');
  }
}

async function searchArea() {
  if (checkAreaSearchInputs()) {
    displayViewResultsSpinner();
    document.getElementById('postalCodeError').innerHTML = '';
    const size = document.getElementById('sizeSmall').checked
      ? 'Small'
      : document.getElementById('sizeLarge').checked
      ? 'Large'
      : '';
    var postalCodeTab = document.getElementById('pills-postalcode');
    var coordinatesTab = document.getElementById('pills-coordinates');
    const latLon = getLatLon();
    if (postalCodeTab.classList.contains('active')) {
      if (checkPostalCode(document.getElementById('postalCodeInput').value)) {
        localStorage.setItem('searchType', 'postal');
        localStorage.setItem('postalCode', document.getElementById('postalCodeInput').value);
        localStorage.setItem('lastSearchType', 'postal');
        localStorage.setItem('lastSearchCriteria', document.getElementById('postalCodeInput').value);
        localStorage.setItem('lastSearchCriteria2', size);
      } else {
        hideViewResultsSpinner();
        document.getElementById('postalCodeError').innerHTML = 'Please input a BC Postal Code in the format: A1A 1A1';
        return false;
      }
    } else if (coordinatesTab.classList.contains('active')) {
      const dms = getDMS(latLon.lat, latLon.lon);
      localStorage.setItem('searchType', 'coords');
      localStorage.setItem('latDms', dms.latDeg + 'deg ' + dms.latMin + 'min ' + dms.latSec + 'sec');
      localStorage.setItem('lonDms', dms.lonDeg + 'deg ' + dms.lonMin + 'min ' + dms.lonSec + 'sec');
      localStorage.setItem('lastSearchType', 'coords');
      localStorage.setItem(
        'lastSearchCriteria',
        JSON.stringify({
          latDeg: dms.latDeg,
          latMin: dms.latMin,
          latSec: dms.latSec,
          lonDeg: dms.lonDeg,
          lonMin: dms.lonMin,
          lonSec: dms.lonSec,
        })
      );
      localStorage.setItem('lastSearchCriteria2', size);
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
        setBreadcrumbSearch();
        setPreviousPage();
        hideViewResultsSpinner();
        window.location.href = '/view-search-results';
      } else {
        hideViewResultsSpinner();
        alert('Error with payment: ' + resJson.error);
      }
    })
    .catch(() => {
      hideViewResultsSpinner();
      alert('Something went wrong');
    });
}

async function getSearchResultsSiteId(url) {
  fetch(url, {
    method: 'GET',
    responseType: 'application/json',
  })
    .then((res) => res.json())
    .then((resJson) => {
      if (!resJson.error) {
        setBreadcrumbSearch();
        setPreviousPage();
        localStorage.setItem('searchResults', JSON.stringify(resJson));
        window.location.href = '/view-search-results';
      } else {
        hideSiteIDSearchSpinner();
        alert('Error with payment: ' + resJson.error);
      }
    })
    .catch(() => {
      hideSiteIDSearchSpinner();
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
        setBreadcrumbSearch();
        setPreviousPage();
        hideViewResultsSpinner();
        window.location.href = '/view-search-results';
      } else {
        hideViewResultsSpinner();
        alert('Error with payment: ' + resJson.error);
      }
    })
    .catch(() => {
      hideViewResultsSpinner();
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
    .then((res) => {
      if (res.ok) {
        return res.blob();
      } else {
        throw Error(res.status);
      }
    })
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
    .catch((err) => {
      if (err.status == 400) {
        alert('Failed to generate the report. You have not been charged.');
      } else {
        alert('Something went wrong');
      }
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
    .then((res) => {
      if (res.ok) {
        return res.blob();
      } else {
        throw res.status;
      }
    })
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
    .catch((err) => {
      if (err == 400) {
        alert('Failed to generate the report. You have not been charged.');
      } else {
        alert('Something went wrong');
      }
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
      .then((res) => {
        if (res.ok) {
          return res.blob();
        } else {
          throw res.status;
        }
      })
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
      .catch((err) => {
        if (err == 400) {
          alert('Failed to generate the report. You have not been charged.');
        } else {
          alert('Something went wrong');
        }
        hideDownloadSpinner(siteId);
        $(':button').prop('disabled', false);
      });
  } else {
    alert('Please select a Report Type');
  }
}

async function emailPdf() {
  const siteId = $('#reportSiteId').val();
  const reportType = document.getElementById(`reportType${siteId}`).value;
  if (reportType == 'synopsis' || reportType == 'detailed') {
    $(':button').prop('disabled', true);
    displayReportEmailSpinner();
    let email = $('#selectReportEmailRadio').is(':checked')
      ? $('#reportEmailSelect').val()
      : $('#reportEmailInput').val();
    if (email !== null && email.match(/^\S+@\S+\.\S+$/) !== null) {
      const response = await fetch(`/bc-registry/email-pdf/${reportType}/${encodeURI(email)}/${siteId}`, {
        method: 'GET',
        responseType: 'application/json',
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw res.status;
          }
        })
        .catch((err) => {
          if (err == 400) {
            alert('Failed to generate the report. You have not been charged.');
          } else {
            alert('Something went wrong');
          }
          hideReportEmailSpinner();
          $(':button').prop('disabled', false);
        });
      alert(response.message);
      hideReportEmailSpinner();
      $(':button').prop('disabled', false);
    } else {
      alert('Please enter a valid email');
      hideReportEmailSpinner();
      $(':button').prop('disabled', false);
    }
  } else {
    alert('Please select a Report Type');
  }
}

async function emailSearchResults() {
  $(':button').prop('disabled', true);
  displayReportEmailSpinner();
  const searchData = JSON.parse(localStorage.getItem('searchResults'));
  let email = $('#selectSearchResultsEmailRadio').is(':checked')
    ? $('#searchResultsEmailSelect').val()
    : $('#searchResultsEmailInput').val();
  if (email !== null && email.match(/^\S+@\S+\.\S+$/) !== null) {
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
        hideReportEmailSpinner();
        $(':button').prop('disabled', false);
      })
      .catch(() => {
        alert('Something went wrong');
        hideReportEmailSpinner();
        $(':button').prop('disabled', false);
      });
  } else {
    alert('Please enter a valid email');
    hideReportEmailSpinner();
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
      searchType = 'pid';
      searchCriteria1 = localStorage.getItem('searchCriteria');
      searchCriteria2 = '';
      searchCriteria3 = '';
      break;
    }
    case 'clf': {
      searchType = 'clf';
      searchCriteria1 = localStorage.getItem('searchCriteria');
      searchCriteria2 = '';
      searchCriteria3 = '';
      break;
    }
    case 'clp': {
      searchType = 'clp';
      searchCriteria1 = localStorage.getItem('searchCriteria');
      searchCriteria2 = '';
      searchCriteria3 = '';
      break;
    }
    case 'sid': {
      searchType = 'sid';
      searchCriteria1 = localStorage.getItem('searchCriteria');
      searchCriteria2 = '';
      searchCriteria3 = '';
      break;
    }
    case 'adr': {
      searchType = 'adr';
      searchCriteria1 = localStorage.getItem('searchCriteria');
      searchCriteria2 = localStorage.getItem('searchCriteria2');
      searchCriteria3 = '';
      break;
    }
    case 'coords': {
      searchType = 'coords';
      searchCriteria1 = localStorage.getItem('latDms');
      searchCriteria2 = localStorage.getItem('lonDms');
      searchCriteria3 = localStorage.getItem('searchCriteria3');
      break;
    }
    case 'postal': {
      searchType = 'postal';
      searchCriteria1 = localStorage.getItem('postalCode');
      searchCriteria2 = localStorage.getItem('searchCriteria3');
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
      searchCriteria3 = localStorage.getItem('searchCriteria3');
      break;
    }
    case 'postal': {
      searchCriteria1 = localStorage.getItem('postalCode');
      searchCriteria2 = localStorage.getItem('searchCriteria3');
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

function setAccount() {
  $(':button').prop('disabled', true);
  displaySetAccountSpinner();
  const accountLabel = $('#accountSelect').val();
  const data = {
    label: accountLabel,
  };
  fetch(`/authentication/setAccount`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'application/json',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((resJson) => {
      $('#setAccountLink').text(accountLabel);
      hideSetAccountSpinner();
      $(':button').prop('disabled', false);
      alert(resJson.message);
      $('#setAccountModal').modal('hide');
    })
    .catch(() => {
      alert('Something went wrong 2');
      hideSetAccountSpinner();
      $(':button').prop('disabled', false);
    });
}

// report download spinner
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

// email report spinner
function displayReportEmailSpinner() {
  var buttonText = document.getElementById('emailReportBtnTxt');
  var spinner = document.getElementById('emailReportSpinner');
  spinner.classList.remove('d-none');
  buttonText.innerText = '';
}

function hideReportEmailSpinner() {
  var buttonText = document.getElementById('emailReportBtnTxt');
  var spinner = document.getElementById('emailReportSpinner');
  if (!spinner.classList.contains('d-none')) {
    spinner.classList.add('d-none');
  }
  buttonText.innerText = 'Send Email';
}

// email search results spinner
function displaySearchResultsEmailSpinner() {
  var buttonText = document.getElementById('emailSearchResultsBtnTxt');
  var spinner = document.getElementById('emailSearchResultsSpinner');
  spinner.classList.remove('d-none');
  buttonText.innerText = '';
}

function hideSearchResultsEmailSpinner() {
  var buttonText = document.getElementById('emailSearchResultsBtnTxt');
  var spinner = document.getElementById('emailSearchResultsSpinner');
  if (!spinner.classList.contains('d-none')) {
    spinner.classList.add('d-none');
  }
  buttonText.innerText = 'Send Email';
}

// nil report download spinner
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

// view results button spinners
function displayViewResultsSpinner() {
  $(':button').prop('disabled', true);
  var buttonText = document.getElementById('searchBtnTxt');
  var spinner = document.getElementById('searchSpinner');
  spinner.classList.remove('d-none');
  buttonText.innerText = '';
}

function hideViewResultsSpinner() {
  var buttonText = document.getElementById('searchBtnTxt');
  var spinner = document.getElementById('searchSpinner');
  if (!spinner.classList.contains('d-none')) {
    spinner.classList.add('d-none');
  }
  buttonText.innerText = 'View Search Results';
  $(':button').prop('disabled', false);
}

// site id search spinner (has different button text)
function displaySiteIDSearchSpinner() {
  $(':button').prop('disabled', true);
  var buttonText = document.getElementById('searchBtnTxt');
  var spinner = document.getElementById('searchSpinner');
  spinner.classList.remove('d-none');
  buttonText.innerText = '';
}

function hideSiteIDSearchSpinner() {
  var buttonText = document.getElementById('searchBtnTxt');
  var spinner = document.getElementById('searchSpinner');
  if (!spinner.classList.contains('d-none')) {
    spinner.classList.add('d-none');
  }
  buttonText.innerText = 'Site ID Selection List';
  $(':button').prop('disabled', false);
}

// set account spinner
function displaySetAccountSpinner() {
  $(':button').prop('disabled', true);
  var buttonText = document.getElementById('setAccountBtnTxt');
  var spinner = document.getElementById('setAccountSpinner');
  spinner.classList.remove('d-none');
  buttonText.innerText = '';
}

function hideSetAccountSpinner() {
  var buttonText = document.getElementById('setAccountBtnTxt');
  var spinner = document.getElementById('setAccountSpinner');
  if (!spinner.classList.contains('d-none')) {
    spinner.classList.add('d-none');
  }
  buttonText.innerText = 'Set Account';
  $(':button').prop('disabled', false);
}

function goToIndex() {
  window.location.href = '/';
}

function goToPrevPage() {
  var prevPage = localStorage.getItem('prevPage');
  if (prevPage) {
    window.location.href = prevPage;
  } else {
    window.location.href = '/';
  }
}

function setPreviousPage() {
  var url = window.location.href;
  var prevPage = url.substring(url.lastIndexOf('/') + 1);
  localStorage.setItem('prevPage', prevPage);
}

function setBreadcrumbSearch() {
  var breadcrumbSearch = document.getElementById('breadcrumbSearch').value;
  localStorage.setItem('breadcrumbSearch', breadcrumbSearch);
}

function setFolio(folioInput) {
  var debounceTimer;

  return function () {
    clearTimeout(debounceTimer);

    const folioValue = folioInput.value;

    // Debounce the fetch request with a delay of 0.5 seconds
    debounceTimer = setTimeout(function () {
      fetch(`bc-registry/set-folio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ folio: folioValue }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 500);
  };
}

var folioInput = document.getElementById('folioInput');
folioInput.addEventListener('input', setFolio(folioInput));

window.onload = function () {
  fetch('bc-registry/get-folio')
    .then((response) => response.json())
    .then((data) => {
      var folioInput = document.getElementById('folioInput');
      folioInput.value = data.folio;
    })
    .catch((error) => {
      console.log(error);
    });

  const lastSearch = localStorage.getItem('lastSearchType');
  const pathName = window.location.pathname;
  switch (pathName) {
    case '/parcel-id':
      if (lastSearch === 'pid') {
        $('#parcelId').val(localStorage.getItem('lastSearchCriteria'));
      }
      break;
    case '/crown-lands-pin':
      if (lastSearch === 'clp') {
        $('#crownLandsPin').val(localStorage.getItem('lastSearchCriteria'));
      }
      break;
    case '/crown-lands-file':
      if (lastSearch === 'clf') {
        $('#crownLandsFile').val(localStorage.getItem('lastSearchCriteria'));
      }
      break;
    case '/site-id-search':
      if (lastSearch === 'sid') {
        $('#siteId').val(localStorage.getItem('lastSearchCriteria'));
      }
      break;
    case '/address-search':
      if (lastSearch === 'adr') {
        $('#address').val(localStorage.getItem('lastSearchCriteria'));
        $('#city').val(localStorage.getItem('lastSearchCriteria2'));
      }
      break;
    case '/area-search':
      if (lastSearch === 'postal') {
        $('#postalCodeInput').val(localStorage.getItem('lastSearchCriteria'));
        const size = localStorage.getItem('lastSearchCriteria2');
        if (size === 'Large') {
          document.getElementById('sizeLarge').checked = true;
        }
        autoDraw();
      } else if (lastSearch === 'coords') {
        if (localStorage.getItem('lastSearchCriteria') != '') {
          const dms = JSON.parse(localStorage.getItem('lastSearchCriteria'));
          console.log(dms);
          const size = localStorage.getItem('lastSearchCriteria2');
          if (size === 'Large') {
            document.getElementById('sizeLarge').checked = true;
          }
          $('#latDegInput').val(dms.latDeg);
          $('#latMinInput').val(dms.latMin);
          $('#latSecInput').val(dms.latSec);
          $('#lonDegInput').val(dms.lonDeg);
          $('#lonMinInput').val(dms.lonMin);
          $('#lonSecInput').val(dms.lonSec);
          const tab = document.getElementById('pills-coordinates-tab');
          const tabInstance = new bootstrap.Tab(tab);
          tabInstance.show();
          autoDraw();
        }
      }
      break;
    default:
      break;
  }
};

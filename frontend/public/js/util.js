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
    const url = `/site-registry/searchCLF/${crownLandsFile}`;
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
  city = city == '' ? 'nocity' : city;
  localStorage.setItem('searchType', 'adr');
  localStorage.setItem('searchCriteria', address);
  localStorage.setItem('searchCriteria2', city);
  if (address !== '') {
    const url = `/site-registry/searchAddr/${address}/${city}`;
    await getSearchResults(url);
  } else {
    alert('Please enter an address');
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
      localStorage.setItem('searchType', 'postal');
      localStorage.setItem('postalCode', document.getElementById('postalCodeInput').value);
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

    const url = `/site-registry/searchArea/${lat}/${lon}/${size}`;
    await getSearchResults(url);
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

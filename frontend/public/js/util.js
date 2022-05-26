// utility functions
async function testapi() {
  fetch('/site-registry/test', {
    method: 'GET',
    responseType: 'application/json',
  })
    .then((res) => res.json())
    .then((resJson) => console.log(resJson));
}

function getPdf() {
  var req = new XMLHttpRequest();
  req.open('GET', '/bc-registry/download-pdf', true);
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
}

function emailPdf() {
  var url = '/bc-registry/email-pdf';
  var email = document.getElementById('emailInput').value;
  var params = `/${email}`;
  var req = new XMLHttpRequest();
  req.open('GET', url + params, true);
  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
      alert(req.responseText);
    }
  };
  req.send();
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

async function testSearch() {
  let participantId = document.getElementById('participantId').value;
  let data = await fetch(`/site-registry/test-search/${participantId}`, {
    method: 'GET',
    responseType: 'application/json',
  }).then((res) => res.json());
  console.log(data);
}

async function searchPid() {
  var parcelId = document.getElementById('parcelId').value;
  localStorage.setItem('currentSearch', 'pid');
  localStorage.setItem('searchCriteria', parcelId);
  localStorage.setItem('searchCriteria2', '');
  let data = await fetch(`/site-registry/searchPid/${parcelId}`, {
    method: 'GET',
    responseType: 'application/json',
  }).then((res) => res.json());
  localStorage.setItem('siteId', data.siteId);
  localStorage.setItem('provState', data.provState);
  localStorage.setItem('address_1', data.address_1);
  localStorage.setItem('city', data.city);
  localStorage.setItem('modifiedDate', data.modifiedDate);
  window.location.href = '/view-search-results';
}

async function searchCLP() {
  var crownLandsPin = document.getElementById('crownLandsPin').value;
  localStorage.setItem('currentSearch', 'clp');
  localStorage.setItem('searchCriteria', crownLandsPin);
  localStorage.setItem('searchCriteria2', '');
  let data = await fetch(`/site-registry/searchCLP/${crownLandsPin}`, {
    method: 'GET',
    responseType: 'application/json',
  }).then((res) => res.json());
  localStorage.setItem('siteId', data.siteId);
  localStorage.setItem('provState', data.provState);
  localStorage.setItem('address_1', data.address_1);
  localStorage.setItem('city', data.city);
  localStorage.setItem('modifiedDate', data.modifiedDate);
  window.location.href = '/view-search-results';
}

async function searchCLF() {
  var crownLandsFile = document.getElementById('crownLandsFile').value;
  localStorage.setItem('currentSearch', 'clf');
  localStorage.setItem('searchCriteria', crownLandsFile);
  localStorage.setItem('searchCriteria2', '');
  let data = await fetch(`/site-registry/searchCLF/${crownLandsFile}`, {
    method: 'GET',
    responseType: 'application/json',
  }).then((res) => res.json());
  localStorage.setItem('siteId', data.siteId);
  localStorage.setItem('provState', data.provState);
  localStorage.setItem('address_1', data.address_1);
  localStorage.setItem('city', data.city);
  localStorage.setItem('modifiedDate', data.modifiedDate);
  window.location.href = '/view-search-results';
}

async function searchSiteId() {
  var siteId = document.getElementById('siteId').value;
  localStorage.setItem('currentSearch', 'sid');
  localStorage.setItem('searchCriteria', siteId);
  localStorage.setItem('searchCriteria2', '');
  let data = await fetch(`/site-registry/searchSiteId/${siteId}`, {
    method: 'GET',
    responseType: 'application/json',
  }).then((res) => res.json());
  localStorage.setItem('siteId', data.siteId);
  localStorage.setItem('provState', data.provState);
  localStorage.setItem('address_1', data.address_1);
  localStorage.setItem('city', data.city);
  localStorage.setItem('modifiedDate', data.modifiedDate);
  window.location.href = '/view-search-results';
}

async function searchAddress() {
  var address = document.getElementById('address').value;
  var city = document.getElementById('city').value;
  localStorage.setItem('currentSearch', 'adr');
  localStorage.setItem('searchCriteria', address);
  localStorage.setItem('searchCriteria2', city);
  let data = await fetch(`/site-registry/searchAddress/${address}`, {
    method: 'GET',
    responseType: 'application/json',
  }).then((res) => res.json());
  localStorage.setItem('siteId', data.siteId);
  localStorage.setItem('provState', data.provState);
  localStorage.setItem('address_1', data.address_1);
  localStorage.setItem('city', data.city);
  localStorage.setItem('modifiedDate', data.modifiedDate);
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
  localStorage.setItem('currentSearch', 'area');
  localStorage.setItem('searchCriteria', 'AREASEARCH');
  localStorage.setItem('searchCriteria2', '');
  let data = await fetch(`/site-registry/searchArea/${lat}/${lng}/${size}`, {
    method: 'GET',
    responseType: 'application/json',
  })
    .then((res) => res.json())
    .then((resJson) => console.log(resJson));
}

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

function areaSearch() {
  var postalCodeTab = document.getElementById('pills-postalcode');
  var coordinatesTab = document.getElementById('pills-coordinates');
  if (postalCodeTab.classList.contains('active')) {
    postalCodeCircle();
  } else if (coordinatesTab.classList.contains('active')) {
    coordinateCircle();
  }
}

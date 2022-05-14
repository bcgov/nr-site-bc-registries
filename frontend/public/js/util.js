// utility functions
function testapi() {
  fetch('/bc-registry/testapi')
    .then((res) => res.json())
    .then((resJson) => console.log(resJson));
}

function getPdf() {
  var req = new XMLHttpRequest();
  req.open('GET', '/bc-registry/testapi', true);
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
        var blob = new Blob([req.response], { type: 'application/pdf' });
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

// utility functions
function testapi() {
  fetch('/bc-registry/testapi')
    .then((res) => res.json())
    .then((resJson) => console.log(resJson));
}
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

document.getElementById('searchButton').addEventListener('click', searchAddress);
document.getElementById('moreinfo1CloseButton').addEventListener('click', function () {
  $('#moreinfo1').modal('hide');
});
document.getElementById('moreinfo2CloseButton').addEventListener('click', function () {
  $('#moreinfo2').modal('hide');
});

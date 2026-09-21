$(window).on('load', function() {
  const setAccountLink = $('#setAccountLink');
  if (setAccountLink.text() == '-') {
    setAccountLink.text('Select an account');
    $('#setAccountModal').modal('show');
  }
  if ($('#accountSelect').val() == null) {
    setAccountLink.text('No eligible accounts found');
    setAccountLink.removeAttr('data-toggle');
    setAccountLink.removeAttr('data-target');
    setAccountLink.css('cursor','default');
    $('#accountError').removeClass('d-none');
  }
  if ($('#accountSelect').val() !== null) {
    if ($('#accountSelect option').length == 1) {
      setAccountLink.removeAttr('data-toggle');
      setAccountLink.removeAttr('data-target');
      setAccountLink.css('cursor','default');
    }
  }
  localStorage.setItem('lastSearchType', '');
  localStorage.setItem('lastSearchCriteria', '');
  localStorage.setItem('lastSearchCriteria2', '');
  localStorage.setItem('lastSearchCriteria3', '');
});

document.getElementById('setAccountButton').addEventListener('click', setAccount);

$("#selectSearchResultsEmailRadio").click(function() {
  $("#searchResultsEmailSelect").prop('disabled', false);
  $("#searchResultsEmailInput").prop('disabled', true);
})
$("#inputSearchResultsEmailRadio").click(function() {
  $("#searchResultsEmailInput").prop('disabled', false);
  $("#searchResultsEmailSelect").prop('disabled', true);
})
$("#selectReportEmailRadio").click(function() {
  $("#reportEmailSelect").prop('disabled', false);
  $("#reportEmailInput").prop('disabled', true);
})
$("#inputReportEmailRadio").click(function() {
  $("#reportEmailInput").prop('disabled', false);
  $("#reportEmailSelect").prop('disabled', true);
})
$(document).on("click", ".emailButton", function () {
  const siteId = $(this).data('id');
  if ($(`#reportType${siteId}`).prop('selectedIndex') != 0) {
    const reportText = $(`#reportType${siteId} option:selected`).text();
    $("#emailReportModal #reportSiteId").val( siteId );
    $("#emailReportModalLabel").text(`Email ${reportText} for Site ${parseInt(siteId)}`);
    $("#emailReportModal").modal('toggle');
  } else {
    alert('Please select a report type');
  }
});
$(document).on("click", ".downloadButton", function () {
  const siteId = $(this).data('id');
  getPdf(siteId);
});
$(document).on("click", "#downloadNilReport", getNilPdf);

document.getElementById('emailReportButton').addEventListener('click', emailPdf);
document.getElementById('emailSearchResultsButton').addEventListener('click', emailSearchResults);

var searchType = localStorage.getItem("searchType")
var searchCriteria = localStorage.getItem("searchCriteria")
var searchCriteria2 = localStorage.getItem("searchCriteria2")
var searchCriteria3 = localStorage.getItem("searchCriteria3")
document.getElementById("searchCriteria").innerHTML = searchCriteria;
switch(searchType) {
  case "pid": {
    document.getElementById("searchType").innerHTML = "Parcel ID Search Results";
    document.getElementById("searchCriteriaTitle").innerHTML = "Parcel ID:";
    break;
  }
  case "clf": {
    document.getElementById("searchType").innerHTML = "Crown Lands File Search Results";
    document.getElementById("searchCriteriaTitle").innerHTML = "Crown Lands File #:";
    break;
  }
  case "clp": {
    document.getElementById("searchType").innerHTML = "Crown Lands PIN Search Results";
    document.getElementById("searchCriteriaTitle").innerHTML = "Crown Lands PIN:";
    break;
  }
  case "sid": {
    document.getElementById("searchType").innerHTML = "Site ID Search Results";
    document.getElementById("searchCriteriaTitle").innerHTML = "Site ID:";
    break;
  }
  case "adr": {
    document.getElementById("searchType").innerHTML = "Address Search Results";
    document.getElementById("searchCriteriaTitle").innerHTML = "Address:";
    document.getElementById("searchCriteria").innerHTML = searchCriteria;
    document.getElementById("searchCriteria2").innerHTML = searchCriteria2;
    break;
  }
  case "coords": {
    document.getElementById("searchType").innerHTML = "Area Search Results";
    document.getElementById("searchCriteriaTitle").innerHTML = "Coordinates & Area Size:";
    document.getElementById("searchCriteria").innerHTML = localStorage.getItem("latDms");
    document.getElementById("searchCriteria2").innerHTML = localStorage.getItem("lonDms");
    document.getElementById("searchCriteria3").innerHTML = searchCriteria3+' Area';
    break;
  }
  case "postal": {
    document.getElementById("searchType").innerHTML = "Area Search Results";
    document.getElementById("searchCriteriaTitle").innerHTML = "Coordinates & Area Size:";
    document.getElementById("searchCriteria").innerHTML = localStorage.getItem("postalCode");
    document.getElementById("searchCriteria2").innerHTML = searchCriteria3+' Area';
    break;
  }
}

// Remove the 2nd and 3rd search criteria columns if they are not used
var secondSearchCriteriaColumn = document.getElementById('searchCriteria2Div');
var thirdSearchCriteriaColumn = document.getElementById('searchCriteria3Div');
if (searchType === 'pid' || searchType === 'clf' || searchType === 'clp' || searchType === 'sid') {
  secondSearchCriteriaColumn.parentNode.removeChild(secondSearchCriteriaColumn);
  thirdSearchCriteriaColumn.parentNode.removeChild(thirdSearchCriteriaColumn);
} else if (searchType === 'adr' || searchType === 'postal') {
  thirdSearchCriteriaColumn.parentNode.removeChild(thirdSearchCriteriaColumn);
}

var breadcrumbSearch = localStorage.getItem("breadcrumbSearch");
var prevPage = localStorage.getItem("prevPage");
document.getElementById("breadcrumbSearch").innerHTML = breadcrumbSearch;
document.getElementById("breadcrumbSearch").href = prevPage;

let data = JSON.parse(localStorage.getItem("searchResults"));
var results = [];
for (let obj of data) {
  myObj = {};
  myObj['Report Type'] = obj.pending == 'PENDING' ? `<select id="reportType${obj.siteId}" class='form-select form-select-sm'><option selected>Choose a Report Type</option></select>` : `<select id="reportType${obj.siteId}" class='form-select form-select-sm'><option selected>Choose a Report Type</option><option value='details'>Details Report - $151</option></select>`;
  myObj['Site ID'] = parseInt(obj.siteId);
  myObj['Updated Date'] = obj.updatedDate;
  myObj['Address/City'] = obj.city;
  myObj['Pending'] = obj.pending;
  myObj[' '] = `<button class='btn btn-primary downloadButton' id="downloadButton${obj.siteId}" data-id="${obj.siteId}" style="width:100%"><span id="downloadSpinner${obj.siteId}" class="spinner-border spinner-border-sm d-none"></span><span id="downloadBtnTxt${obj.siteId}">Download</span></button>`;
  myObj['  '] = `<button class='btn btn-primary emailButton' data-id="${obj.siteId}">Email</button>`;
  results.push(myObj);
};

$(document).ready(function () {
  var tableClient = $('#sitesTable').DataTable({
    language: {
      emptyTable: `<div class="m-2">No sites were found with the given search criteria.</div><button class='btn btn-primary' id="downloadNilReport"><span id="nilSpinner" class="spinner-border spinner-border-sm d-none"></span><span id="nilBtnText">Download Nil Search Report</span></button>`
    },
    paging: false,
    searching: false,
    data: results,
    columns: [
      {data: "Report Type"},
      {data: "Site ID"},
      {data: "Updated Date"},
      {data: "Address/City"},
      {data: "Pending"},
      {data: " "},
      {data: "  "},
    ]
  });
});

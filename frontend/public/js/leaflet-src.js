var map = L.map('map').setView([48.428, -123.365], 15);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: false,
    circle: false,
    rectangle: false,
    circlemarker: false,
    marker: {
      addEventListener,
    },
  },
  edit: {
    featureGroup: drawnItems,
    edit: false,
    remove: false,
  },
});

L.drawLocal.draw.toolbar.buttons.marker = 'Specify a location on the map';
L.drawLocal.draw.handlers.marker.tooltip.start = 'Click to place the area';
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
  document.getElementById('pills-coordinates-tab').click(); // marker is based on coordinates so switch to coords tab
  var type = e.layerType,
    layer = e.layer;
  drawnItems.addLayer(layer);
  if (type == 'marker') {
    const latlng = layer.getLatLng();
    const latitude = latlng.lat;
    const longitude = latlng.lng;
    const size = document.getElementById('sizeSmall').checked
      ? 's'
      : document.getElementById('sizeLarge').checked
      ? 'l'
      : '';
    if (checkCoords(latitude, longitude)) {
      setDMSInputs(latitude, longitude);
      drawCircle(latitude, longitude, size);
    }
    map.removeLayer(layer);
  }
});

var circleOptions = {
  color: 'green',
  fillColor: '#3f0',
  fillOpacity: 0.25,
};
var radiusSmall = 500; // 500m area
var radiusLarge = 5000; // 5 km
var latlng = [48.428, -123.365]; // victoria - these coords arent actually used when drawing though
// circles have to be instantiated here and not inside a function or you'll get a cryptic error
// other objects like markers and rectangles can be created anywhere though
var smallCircle = L.circle(latlng, radiusSmall, circleOptions);
var largeCircle = L.circle(latlng, radiusLarge, circleOptions);

// *************************
// allow the user to manipulate the circle location + update lat/long
smallCircle.on({
  mousedown: function () {
    map.dragging.disable();
    if (!document.getElementById('pills-coordinates-tab').classList.contains('active')) {
      document.getElementById('pills-coordinates-tab').click();
      document.getElementById('postalCodeInput').value = '';
    }
    map.on('mousemove', function (e) {
      if (checkCoords(e.latlng.lat, e.latlng.lng)) {
        smallCircle.setLatLng(e.latlng);
        setDMSInputs(e.latlng.lat, e.latlng.lng);
      }
    });
  },
});
largeCircle.on({
  mousedown: function () {
    map.dragging.disable();
    map.on('mousemove', function (e) {
      if (checkCoords(e.latlng.lat, e.latlng.lng)) {
        largeCircle.setLatLng(e.latlng);
        setDMSInputs(e.latlng.lat, e.latlng.lng);
      }
    });
  },
});
map.on('mouseup', function (e) {
  map.removeEventListener('mousemove');
  map.dragging.enable();
});
// *************************

// ********************************************************
// functions that are used to manipulate the leaflet map
function postalCodeCircle() {
  const postalCode = document.getElementById('postalCodeInput').value;
  if (checkPostalCode(postalCode)) {
    document.getElementById('postalCodeError').innerHTML = '';
    fetch(`/map/postalcode/${encodeURI(postalCode)}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data !== null) {
          const latitude = parseFloat(data.lat);
          const longitude = parseFloat(data.lng);
          const size = document.getElementById('sizeSmall').checked
            ? 's'
            : document.getElementById('sizeLarge').checked
            ? 'l'
            : '';
          if (checkCoords(latitude, longitude)) {
            setDMSInputs(latitude, longitude);
            drawCircle(latitude, longitude, size);
          }
        }
      })
      .catch(function () {
        console.log('Failed to fetch the postal code coordinates');
      });
  } else {
    document.getElementById('postalCodeError').innerHTML = 'Please input a BC Postal Code in the format: A1A 1A1';
  }
}

function coordinateCircle() {
  const latLon = getLatLon();
  const latitude = latLon.lat;
  const longitude = latLon.lon;
  const size = document.getElementById('sizeSmall').checked
    ? 's'
    : document.getElementById('sizeLarge').checked
    ? 'l'
    : '';
  drawCircle(latitude, longitude, size);
}

function drawCircle(latitude, longitude, size) {
  if (checkCoords(latitude, longitude)) {
    if (map.hasLayer(largeCircle)) {
      map.removeLayer(largeCircle);
    }
    if (map.hasLayer(smallCircle)) {
      map.removeLayer(smallCircle);
    }
    if (size == 's') {
      smallCircle._latlng.lat = latitude;
      smallCircle._latlng.lng = longitude;
      smallCircle.addTo(map);
      map.setView([latitude, longitude], 15);
    } else if (size == 'l') {
      largeCircle._latlng.lat = latitude;
      largeCircle._latlng.lng = longitude;
      largeCircle.addTo(map);
      map.setView([latitude, longitude], 12);
    }
  }
}

function checkPostalCode(postalCode) {
  // postalCode = postalCode.toString().trim(); // remove white space
  var regex = new RegExp(
    /([Vv]\d)([ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz] \d)([ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz]\d)/i
  );
  // var regex = new RegExp(/([Vv]\d)([ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz]\d){2}/i); // BC POSTAL CODE
  if (regex.test(postalCode.toString())) {
    return true;
  } else {
    return false;
  }
}

function checkCoords(lat, lng) {
  return lat >= 48.224 && lat <= 60.0 && lng >= -139.061 && lng <= -114.054 ? true : false;
  // return lat <= 90 && lat >= -90 && long <= 180 && long >= -180 ? true : false;
}

// ********************************************************
// functions that deal with coordinate conversions
function getLatLon() {
  const latDeg = parseFloat(document.getElementById('latDegInput').value);
  const latMin = parseFloat(document.getElementById('latMinInput').value);
  const latSec = parseFloat(document.getElementById('latSecInput').value);
  const lonDeg = parseFloat(document.getElementById('lonDegInput').value);
  const lonMin = parseFloat(document.getElementById('lonMinInput').value);
  const lonSec = parseFloat(document.getElementById('lonSecInput').value);

  const lat = latDeg + latMin / 60 + latSec / 3600;
  const lon = -1 * (lonDeg + lonMin / 60 + lonSec / 3600);
  return { lat, lon };
}

function getDMS(lat, lon) {
  if (lon < 0) lon = lon * -1;
  let latDeg = parseInt(lat);
  let latMin = parseInt((lat - latDeg) * 60);
  let latSec = parseFloat((lat - latDeg - latMin / 60) * 3600).toFixed(1);
  let lonDeg = parseInt(lon);
  let lonMin = parseInt((lon - lonDeg) * 60);
  let lonSec = parseFloat((lon - lonDeg - lonMin / 60) * 3600).toFixed(1);
  return { latDeg, latMin, latSec, lonDeg, lonMin, lonSec };
}

function setDMSInputs(lat, lon) {
  const dms = getDMS(lat, lon);
  document.getElementById('latDegInput').value = dms.latDeg;
  document.getElementById('latMinInput').value = dms.latMin;
  document.getElementById('latSecInput').value = dms.latSec;
  document.getElementById('lonDegInput').value = dms.lonDeg;
  document.getElementById('lonMinInput').value = dms.lonMin;
  document.getElementById('lonSecInput').value = dms.lonSec;
}
// ********************************************************

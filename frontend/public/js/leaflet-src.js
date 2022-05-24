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
var radiusSmall = 159.15494309;
var radiusLarge = 15915.494309;
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
    map.on('mousemove', function (e) {
      if (checkCoords(e.latlng.lat, e.latlng.lng)) {
        smallCircle.setLatLng(e.latlng);
        document.getElementById('latitudeInput').value = smallCircle._latlng.lat.toFixed(5);
        document.getElementById('longitudeInput').value = smallCircle._latlng.lng.toFixed(5);
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
        document.getElementById('latitudeInput').value = largeCircle._latlng.lat;
        document.getElementById('longitudeInput').value = largeCircle._latlng.lng;
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
    postalCode.replace(' ', '');

    // ~~~using txt file~~~
    fetch(`/map/postalcode/${postalCode}`)
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
            drawCircle(latitude, longitude, size);
          }
        }
      })
      .catch(function () {
        console.log('Failed to fetch the postal code coordinates');
      });
  } else {
    console.log('Bad Postal Code');
  }
  // ~~~using geocoder~~~
  // const url = `https://geocoder.ca/${postalCode}?json=1`;
  // fetch(url)
  //   .then(function (response) {
  //     if (response.status == 403) {
  //       console.log('API request failed');
  //       return null;
  //     }
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     if (data !== null) {
  //       const latitude = parseFloat(data.latt);
  //       const longitude = parseFloat(data.longt);
  //       const size = document.getElementById('sizeSmall').checked
  //         ? 's'
  //         : document.getElementById('sizeLarge').checked
  //         ? 'l'
  //         : '';
  //       drawCircle(latitude, longitude, size);
  //     }
  //   })
  //   .catch(function () {
  //     console.log('Failed to fetch the postal code coordinates');
  //   });
}

function coordinateCircle() {
  const latitude = parseFloat(document.getElementById('latitudeInput').value);
  const longitude = parseFloat(document.getElementById('longitudeInput').value);
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
      document.getElementById('latitudeInput').value = smallCircle._latlng.lat.toFixed(5);
      document.getElementById('longitudeInput').value = smallCircle._latlng.lng.toFixed(5);
      smallCircle.addTo(map);
      map.setView([latitude, longitude], 16);
    } else if (size == 'l') {
      largeCircle._latlng.lat = latitude;
      largeCircle._latlng.lng = longitude;
      document.getElementById('latitudeInput').value = smallCircle._latlng.lat.toFixed(5);
      document.getElementById('longitudeInput').value = smallCircle._latlng.lng.toFixed(5);
      largeCircle.addTo(map);
      map.setView([latitude, longitude], 10);
    }
  } else {
    console.log('Invalid lat/long');
  }
}

function checkPostalCode(postalCode) {
  postalCode = postalCode.toString().trim();
  // var regex = new RegExp(
  //   /([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/i,
  // );
  var regex = new RegExp(/([Vv]\d)([ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz]\d){2}/i); // BC POSTAL CODE
  if (regex.test(postalCode.toString().replace(/\W+/g, ''))) {
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

type latlng = { lat: number; lng: number };

export function isInsideArea(checkPoint: latlng, centerPoint: latlng, meters: number) {
  const km = meters / 1000;
  var ky = 40000 / 360;
  var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
}

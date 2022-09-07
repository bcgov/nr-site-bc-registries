type latlng = { lat: number; lng: number };

export function isInsideArea(checkPoint: latlng, centerPoint: latlng, meters: number) {
  const km = meters / 1000;
  var ky = 40000 / 360;
  var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
}

// returns current time in hh:mm:ss format
export function getCurrentTime() {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const hStr = hours < 10 ? '0' + hours : hours.toString();
  const mStr = minutes < 10 ? '0' + minutes : minutes.toString();
  const sStr = seconds < 10 ? '0' + seconds : seconds.toString();
  return hStr + ':' + mStr + ':' + sStr;
}

// returns todays date in dd-mm-yy format
export function getTodaysDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const dStr = day < 10 ? '0' + day : day.toString();
  const mStr = month < 10 ? '0' + month : month.toString();
  const yStr = year.toString().slice(2);
  return dStr + '-' + mStr + '-' + yStr;
}

export function delay(milliseconds: number) {
  console.log("Delaying for "+milliseconds+" milliseconds");
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
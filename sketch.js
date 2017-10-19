let mapimg;

let clat = 0;
let clng = 0;

let lat = 49.2827;
let lng = -123.1207;

let zoom = 1;

let earthquakes;

let mapType = dark-v9;

function preload() {
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoicmZ1cnJ5IiwiYSI6ImNqOHhtZGtzMzBsbTEycW5yNHA1b2IwdXoifQ.RUYcUQzoD72XlwQ0789qMw');

  earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

function mercX(lng) {
  lng = radians(lng);
  let a = (128 / PI) * pow(2, zoom);
  let b = lng + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  let a = (128 / PI) * pow(2, zoom);
  let b = tan(PI / 4 + lat / 2);
  let c = PI - log(b);
  return a * c;
}

function setup() {
  createCanvas(1024, 512);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
  image(mapimg, 0, 0);

  let cx = mercX(clng);
  let cy = mercY(clat);

  for (var i = 0; i < earthquakes.length; i++) {
    let data = earthquakes[i].split(/,/);
    let lat = data[1];
    let lng = data[2];
    let mag = data[4];
    let x = mercX(lng) - cx;
    let y = mercY(lat) - cy;

    mag = pow(10, mag);
    mag = sqrt(mag);

    var magmax = sqrt(pow(10, 10));

    let d = map(mag, 0, magmax, 0, 180);
    stroke(255, 0, 255);

    fill(255, 0, 255, 200);
    ellipse(x, y, d, d);
  }
}

// function draw() {
//
// }

let mySound;
let fft;
let stars;
function preload() {
  mySound = loadSound(
    "./ab.mp3"
  );
}

function setup() {
  createCanvas(1400, 800);
  noFill();
  fft = new p5.FFT();
  fft.setInput(mySound);

  stars = [
    [random(), random()]
  ]

  mySound.play();
}

function draw() {
  background(200);

  let spectrum = fft.analyze();

  beginShape();
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0));
  }
  endShape();

  for (let i = 0; i < stars.length; i++) {
    push();
    translate(width * stars[i][0], height * stars[i][1]);
    rotate(frameCount / -100.0);
    star(0, 0, 30, 70, 5);
    pop();
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
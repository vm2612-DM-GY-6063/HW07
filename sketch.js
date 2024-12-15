let textLines = [];
let angleOffset = 0; // Angle offset for rotation
let displayClock = false; // Flag to toggle clock on click

function preload() {
  // Load the text file (make sure 'text.txt' is in your project folder)
  textLines = loadStrings('text.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Full canvas size
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0);
}

function draw() {
  background(255);

  if (displayClock && textLines.length > 0) {
    // Draw the clock-like text arrangement
    let radius = min(width, height) / 3; // Dynamic radius based on canvas size
    let angleStep = TWO_PI / textLines.length; // Angle step for each text line

    push();
    translate(width / 2, height / 2); // Move to the center of the canvas

    for (let i = 0; i < textLines.length; i++) {
      let angle = i * angleStep + angleOffset; // Calculate angle for each line
      let x = radius * cos(angle); // X position
      let y = radius * sin(angle); // Y position

      push();
      translate(x, y); // Move to text position
      rotate(angle + HALF_PI); // Rotate text to face outward
      text(textLines[i], 0, 0); // Display text
      pop();
    }

    pop();

    // Slowly rotate the clock
    angleOffset += 0.01;
  } else {
    // Display a message to click
    textSize(32);
    fill(100);
    text("Click to toggle the clock", width / 2, height / 2);
  }
}

function mousePressed() {
  // Toggle clock display on click
  displayClock = !displayClock;
}

function windowResized() {
  // Adjust canvas size dynamically on window resize
  resizeCanvas(windowWidth, windowHeight);
}

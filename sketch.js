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

      push();let textLines = [];
      let letters = [];
      let floatingLetters = [];
      let formingClock = false; // State toggle
      let clockFormationProgress = 0; // Progress of clock transition
      let angleOffset = 0; // Angle offset for rotating text
      
      function preload() {
        // Load text file
        textLines = loadStrings('text.txt');
      }
      
      function setup() {
        createCanvas(windowWidth, windowHeight);
        textAlign(CENTER, CENTER);
        textSize(24);
        fill(0);
      
        // Split text lines into letters and initialize floating letters
        for (let line of textLines) {
          for (let letter of line.split("")) {
            floatingLetters.push({
              letter: letter,
              x: random(width),
              y: random(height),
              targetX: 0,
              targetY: 0,
              xSpeed: random(-0.5, 0.5),
              ySpeed: random(-0.5, 0.5),
              size: random(16, 32),
              opacity: random(100, 200),
            });
          }
        }
      }
      
      function draw() {
        background(255);
        let radius = min(width, height) / 3;
      
        if (formingClock) {
          animateClockFormation(radius);
          angleOffset += 0.01; // Rotate text dynamically
        } else {
          displayFloatingLetters();
        }
      }
      
      function displayFloatingLetters() {
        // Floating letters move around
        for (let letterObj of floatingLetters) {
          fill(0, letterObj.opacity);
          textSize(letterObj.size);
          text(letterObj.letter, letterObj.x, letterObj.y);
      
          // Update positions for floating effect
          letterObj.x += letterObj.xSpeed;
          letterObj.y += letterObj.ySpeed;
      
          // Wrap around edges
          if (letterObj.x > width) letterObj.x = 0;
          if (letterObj.x < 0) letterObj.x = width;
          if (letterObj.y > height) letterObj.y = 0;
          if (letterObj.y < 0) letterObj.y = height;
        }
      }
      
      function animateClockFormation(radius) {
        let totalLetters = floatingLetters.length;
        let angleStep = TWO_PI / totalLetters;
      
        clockFormationProgress = min(clockFormationProgress + 0.02, 1); // Transition speed
      
        for (let i = 0; i < totalLetters; i++) {
          let angle = i * angleStep + angleOffset; // Add rotation
          let targetX = width / 2 + radius * cos(angle);
          let targetY = height / 2 + radius * sin(angle);
      
          // Lerp for smooth transition
          floatingLetters[i].x = lerp(floatingLetters[i].x, targetX, clockFormationProgress);
          floatingLetters[i].y = lerp(floatingLetters[i].y, targetY, clockFormationProgress);
      
          push();
          translate(floatingLetters[i].x, floatingLetters[i].y);
          rotate(angle + HALF_PI); // Rotate text to face outward
          textSize(24);
          fill(0);
          text(floatingLetters[i].letter, 0, 0);
          pop();
        }
      
        if (clockFormationProgress >= 1) {
          drawClockHands(radius);
        }
      }
      
      function drawClockHands(radius) {
        let hr = hour() % 12;
        let min = minute();
        let sec = second();
      
        push();
        translate(width / 2, height / 2);
      
        // Hour hand
        stroke(0);
        strokeWeight(8);
        let hourAngle = map(hr + min / 60, 0, 12, -HALF_PI, TWO_PI - HALF_PI);
        line(0, 0, cos(hourAngle) * radius * 0.5, sin(hourAngle) * radius * 0.5);
      
        // Minute hand
        strokeWeight(4);
        let minuteAngle = map(min, 0, 60, -HALF_PI, TWO_PI - HALF_PI);
        line(0, 0, cos(minuteAngle) * radius * 0.7, sin(minuteAngle) * radius * 0.7);
      
        // Second hand
        stroke(255, 0, 0);
        strokeWeight(2);
        let secondAngle = map(sec, 0, 60, -HALF_PI, TWO_PI - HALF_PI);
        line(0, 0, cos(secondAngle) * radius * 0.9, sin(secondAngle) * radius * 0.9);
      
        pop();
      }
      
      function mousePressed() {
        // Toggle states on click
        formingClock = !formingClock;
        clockFormationProgress = 0; // Reset transition progress
      }
      
      function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
      }
      
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

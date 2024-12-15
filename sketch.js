let textLines = [];
let currentLineIndex = 0;
let charIndex = 0;
let displaySpeed = 100; // Speed of character display (milliseconds)
let lastCharTime = 0;

function preload() {
  // Load the text file (make sure 'text.txt' is in your project folder)
  textLines = loadStrings('text.txt');
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(36);
  fill(255);
}

function draw() {
  background(0);

  if (textLines.length > 0) {
    let currentLine = textLines[currentLineIndex];

    // Gradually display characters one by one
    if (millis() - lastCharTime > displaySpeed) {
      charIndex++;
      lastCharTime = millis();
    }

    // Display the current substring of the line
    let partialText = currentLine.substring(0, charIndex);
    text(partialText, width / 2, height / 2);

    // Move to the next line when the current line is fully displayed
    if (charIndex >= currentLine.length) {
      charIndex = 0;
      currentLineIndex = (currentLineIndex + 1) % textLines.length;
    }

    // Dynamic size and color to keep the animation alive
    textSize(36 + sin(frameCount * 0.1) * 5);
    fill(200 + sin(frameCount * 0.05) * 55, 150, 255);
  }
}

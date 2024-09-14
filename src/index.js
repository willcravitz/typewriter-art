// Sounds
const keyClick = new Audio("../static/sounds/typewriter_click.wav");
const newLineDing = new Audio("../static/sounds/typewriter_ding.wav");

// Fonts
const fontE = new FontFace(
	"Typewriter E",
	"url(../static/fonts/TT2020StyleE-Regular.woff2)"
);
fontE
	.load()
	.then((loadedFont) => {
		document.fonts.add(loadedFont);
		ctx.font = "12px 'Typewriter E'";
		drawTypingArea();
	})
	.catch((error) => {
		console.error("Font loading failed:", error);
	});

// Set up canvas
const canvas = document.getElementById("letter-canvas");
const ctx = canvas.getContext("2d");

const letterHeight = 11;
const letterWidth = 8.5;
const letterRatio = letterHeight / letterWidth;
canvas.height = canvas.width * letterRatio;

const letterMargin = 1;
const typingAreaX = (letterMargin / letterWidth) * canvas.width;
const typingAreaY = (letterMargin / letterHeight) * canvas.height;
const typingAreaWidth =
	canvas.width * ((letterWidth - 2 * letterMargin) / letterWidth);
const typingAreaHeight =
	canvas.height * ((letterHeight - 2 * letterMargin) / letterHeight);

function drawTypingArea() {
	ctx.strokeStyle = "000";
	ctx.strokeRect(typingAreaX, typingAreaY, typingAreaWidth, typingAreaHeight);
}

let xPos = typingAreaX; // Initial x position inside typing area
let yPos = typingAreaY; // Fixed y position inside typing area
const spacing = 0; // Space between letters

const bounce = 30;
let typingTimeout;

function handleType(event) {
	const key = event.key;
	const isPrintable = key.length === 1 && key.match(/[ -~]/);
	if (!isPrintable) {
		event.preventDefault();
	} else {
		// Clear any existing timeout
		clearTimeout(typingTimeout);

		// Set a new timeout to handle the delay
		typingTimeout = setTimeout(() => {
			ctx.fillText(key, xPos, yPos);
			textWidth = ctx.measureText(key).width + spacing;
			textHeight = ctx.measureText(key).height;
			xPos += textWidth;
			if (xPos > typingAreaX + typingAreaWidth) {
				// Move to the next line (optional)
				xPos = typingAreaX + 10; // Reset x position
				yPos += textHeight; // Move down to the next line
			}
			keyClick.currentTime = 0;
			keyClick.play();
		}, bounce);
	}
}

document.addEventListener("keydown", handleType);

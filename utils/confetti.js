import confetti from "canvas-confetti";

var duration = 4 * 1000;
var end = Date.now() + duration;

export default function frame() {
  // launch a few confetti from the left edge
  confetti({
    particleCount: 5,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
  });
  // and launch a few from the right edge
  confetti({
    particleCount: 5,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
  });

  // keep going until we are out of time
  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}

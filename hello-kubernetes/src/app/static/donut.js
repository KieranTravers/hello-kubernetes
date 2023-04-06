const canvas = document.getElementById("donut");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gridWidth = 80;
const gridHeight = 22;

let A = 0;
let B = 0;
const buffer = Array(1760).fill(' ');
const zbuffer = Array(1760).fill(0);

const fps = 30;
const frameDelay = 1000 / fps;
let lastFrameTime = 0;

let donutX = Math.floor(Math.random() * (canvas.width - gridWidth * 10));
let donutY = Math.floor(Math.random() * (canvas.height - gridHeight * 20));

const renderLoop = () => {
  const frameTime = performance.now();
  const elapsed = frameTime - lastFrameTime;
  if (elapsed > frameDelay) {
    lastFrameTime = frameTime - (elapsed % frameDelay);

    zbuffer.fill(0);
    buffer.fill(' ');

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const time = frameTime / 1000;
    
    // Update the donut position using a combination of sine and cosine functions
    donutX += 3 * Math.sin(time * 0.9) * Math.cos(time * 0.7);
    donutY += 3 * Math.cos(time * 1.1) * Math.sin(time * 0.8);



      for (let j = 0; j < 628; j += 7) {
        let jj = j / 100;
        for (let i = 0; i < 628; i += 2) {
          let ii = i / 100;

          let c = Math.sin(ii);
          let d = Math.cos(jj);
          let e = Math.sin(A);
          let f = Math.sin(jj);
          let g = Math.cos(A);
          let h = d + 2;
          let D = 1 / (c * h * e + f * g + 5);
          let l = Math.cos(ii);
          let m = Math.cos(B);
          let n = Math.sin(B);
          let t = c * h * g - f * e;

          let x = Math.floor(40 + 30 * D * (l * h * m - t * n));
          let y = Math.floor(12 + 15 * D * (l * h * n + t * m));
          let o = x + 80 * y;
          let N = Math.floor(
            8 *
              ((f * e - c * d * g) * m -
                c * d * e -
                f * g -
                l * d * n)
          );

          if (0 < y && y < 22 && 0 < x && x < 80 && D > zbuffer[o]) {
            zbuffer[o] = D;
            buffer[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
          }
        }
      }

      ctx.fillStyle = 'white';

      for (let y = 0; y < 22; y++) {
        for (let x = 0; x < 80; x++) {
          if (buffer[x + 80 * y] !== ' ') {
            ctx.fillText(buffer[x + 80 * y], donutX + x * 10, donutY + y * 20);
          }
        }
      }
      

      // angles for the next frame
      A += 0.04;
      B += 0.02;
    }

    // Repeat the loop
    requestAnimationFrame(renderLoop);
  };

  // Start the loop
  renderLoop();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderDonut };
} else {
  window.renderDonut = renderDonut;
}
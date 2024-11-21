const canvas = document.getElementById('jeuCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height / 2;
const size = 20;
const speed = 5;

document.addEventListener('keydown', move);

function move(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (e.key === 'ArrowUp') y -= speed;
    if (e.key === 'ArrowDown') y += speed;
    if (e.key === 'ArrowLeft') x -= speed;
    if (e.key === 'ArrowRight') x += speed;

    ctx.fillStyle = 'blue';
    ctx.fillRect(x, y, size, size);
}

ctx.fillStyle = 'blue';
ctx.fillRect(x, y, size, size);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let isHoveringLink = false; 

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 5; 
    this.speedX = Math.random() * 3 - 1.5; 
    this.speedY = Math.random() * 3 - 1.5; 
    this.color = isHoveringLink ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
}

Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.95;
};

Particle.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
};

function handleParticles(e) {
    const xPos = e.x;
    const yPos = e.y;
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(xPos, yPos));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.5) {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

const links = document.querySelectorAll('.cinq a');

links.forEach(link => {
    link.addEventListener('mouseover', () => {
        isHoveringLink = true; 
    });
    
    link.addEventListener('mouseout', () => {
        isHoveringLink = false; 
    });
});

window.addEventListener('mousemove', handleParticles);
animate();

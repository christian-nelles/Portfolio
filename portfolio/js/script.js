const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');
const audio = document.getElementById('background-audio');

let isRunning = true; // Le jeu commence en pause
let score = 0;
let gameSpeed = 5;
let isGameStarted = false;

// Load sprites

const playerSpriteSheet = new Image();
playerSpriteSheet.src = '../images/spritesheet.png';

const groundImage = new Image();
groundImage.src = '../images/Terrain.png'; // Remplace par l'URL du sprite pour le sol

const obstacleImage = new Image();
obstacleImage.src = '../images/Blue.png'; // Remplace par l'URL du sprite pour l'obstacle


const playerSpriteWidth = 528; // Largeur du sprite
const playerSpriteHeight = 528; // Hauteur du sprite
let playerFrameX = 0; // Pour suivre l'index du cadre actuel
let playerFrameY = 0; // Si tu as plusieurs lignes de sprites, tu peux ajuster cela (ici, 1 seule ligne)
let playerFrameCount = 7; // Nombre total de cadres dans ton spritesheet
let playerFrameSpeed = 4; // Vitesse de l'animation

function updatePlayerFrameSpeed() {
    // Réduit la vitesse de l'animation en fonction de la vitesse du jeu, mais assure un minimum de 0.1
    playerFrameSpeed = Math.max(0.1, 4 * Math.pow(0.98, gameSpeed)); // Ajuste 0.98 pour ralentir progressivement
}

// Appeler cette fonction dans la boucle principale (avant de dessiner le joueur)
updatePlayerFrameSpeed();

let playerFrameTimer = 0;

function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
        audio.play().catch(error => console.log("Erreur lors de la lecture : ", error));
    } else {
        audio.pause();
    }
}

document.addEventListener('visibilitychange', handleVisibilityChange);

const player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    dy: 0,
    jumpHeight: -15,
    gravity: 0.8,
    isJumping: false
};

const ground = {
    x: 0,
    y: 350,
    width: canvas.width,
    height: 50
};

const obstacles = [];
const obstacleWidth = 50;
const obstacleHeight = 50;
let obstacleSpawnRate = 1500;

let groundX = 0; // Position du sol pour le défilement

function spawnObstacle() {
    obstacles.push({
        x: canvas.width,
        y: ground.y - obstacleHeight,
        width: obstacleWidth,
        height: obstacleHeight
    });
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= gameSpeed;

        if (obs.x + obs.width < 0) {
            obstacles.splice(i, 1);
        }

        if (
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.height > obs.y
        ) {
            isRunning = false;
            gameOver();
        }
    }
}

function gameOver() {
    isRunning = false;
    finalScoreDisplay.textContent = Math.floor(score);
    gameOverScreen.style.display = 'block';    
    audio.pause();
}
let obstacleInterval;


function resetGame() {
    isRunning = true;
    score = 0;
    gameSpeed = 5;
    obstacles.length = 0;
    player.y = ground.y - player.height;
    player.dy = 0;
    groundX = 0;
    gameOverScreen.style.display = 'none'; // Cache l'écran Game Over
    audio.currentTime = 0;  // Remet le son au début
    audio.play();  // Relance le son
    clearInterval(obstacleInterval);  // Arrête l'intervalle des obstacles
    obstacleInterval = setInterval(() => {  // Relance l'intervalle des obstacles
        if (isRunning) spawnObstacle();
    }, obstacleSpawnRate);
    gameLoop();
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (!isGameStarted) {
            isGameStarted = true;
            audio.play();  // Assure-toi que le son est joué dès le début
            obstacleInterval = setInterval(() => {  // Lancer la génération d'obstacles
                if (isRunning) spawnObstacle();
            }, obstacleSpawnRate);
            gameLoop();
        }
    }
    if (e.code === 'Space' && !isRunning) {
        resetGame();  // Réinitialiser le jeu lorsqu'on appuie sur Space après une collision
    }
    if (e.code === 'Space' && !player.isJumping) {
        player.isJumping = true;
        player.dy = player.jumpHeight;
    }
});

restartButton.addEventListener('click', resetGame);

function updatePlayer() {
    if (player.isJumping) {
        player.dy += player.gravity;
        player.y += player.dy;

        if (player.y >= ground.y - player.height) {
            player.y = ground.y - player.height;
            player.isJumping = false;
        }
    }
}

function drawPlayer() {
    // Mettre à jour l'animation du joueur
    playerFrameTimer++;
    if (playerFrameTimer >= playerFrameSpeed) {
        playerFrameX = (playerFrameX + 1) % playerFrameCount; // Passer au cadre suivant (7 cadres max)
        playerFrameTimer = 0; // Réinitialiser le timer
    }

    // Dessiner le joueur avec un cadre spécifique du spritesheet
    ctx.drawImage(
        playerSpriteSheet, 
        playerFrameX * playerSpriteWidth, playerFrameY * playerSpriteHeight, 
        playerSpriteWidth, playerSpriteHeight, 
        player.x, player.y, 
        player.width, player.height
    );
}

function drawGround() {
    const patternWidth = groundImage.width;

    for (let i = groundX; i < canvas.width; i += patternWidth) {
        ctx.drawImage(groundImage, i, ground.y, patternWidth, ground.height);
    }

    groundX -= gameSpeed;

    if (groundX <= -patternWidth) {
        groundX += patternWidth;
    }
}


function drawObstacles() {
    obstacles.forEach((obs) => {
        ctx.drawImage(obstacleImage, obs.x, obs.y, obs.width, obs.height);
    });
}

function drawScore() {
    ctx.font = '20px "Courier New", monospace';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'right';
    ctx.fillText(`Score: ${Math.floor(score)}`, canvas.width - 10, 30);
}

function gameLoop() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGround();
    updatePlayer();
    drawPlayer();
    updateObstacles();
    drawObstacles();
    drawScore();

    score += 0.05;
    gameSpeed += 0.001;

    requestAnimationFrame(gameLoop);
}

setInterval(() => {
    if (isRunning) spawnObstacle();
}, obstacleSpawnRate);

gameLoop();


const audio = document.getElementById('background-audio');
const startButton = document.getElementById('button');

// Fonction pour gérer le son en fonction de la visibilité
function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
        // Jouer le son si la page est visible
        audio.play().catch(error => console.log("Erreur lors de la lecture : ", error));
    } else {
        // Mettre en pause le son si la page est invisible
        audio.pause();
    }
}

// Ajouter un événement au bouton pour lancer le son
startButton.addEventListener('click', () => {
    audio.play().then(() => {
        startButton.style.display = 'none'; // Masquer le bouton après activation
        document.addEventListener('visibilitychange', handleVisibilityChange);
    }).catch(error => console.log("Erreur lors du lancement initial : ", error));
});
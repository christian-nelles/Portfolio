document.addEventListener("DOMContentLoaded", () => {
    const blackScreen = document.getElementById("black-screen");

    // Attendre 8 secondes avant de masquer l'écran noir
    setTimeout(() => {
        blackScreen.classList.add("hidden");
    }, 8000); // 8000 ms = 8 secondes
});


$(document).ready(function() {
    // Après 10 secondes (10000 ms), ajouter une classe à un élément
    setTimeout(function() {
        $('.slider').toggleClass('close');
    }, 8000); // 10000 ms = 10 secondes
});

$(document).ready(function() {
    $('#button').click(function() {
        $('#section-to-hide').fadeOut(); // Cache la section avec un effet de fondu
    });
});

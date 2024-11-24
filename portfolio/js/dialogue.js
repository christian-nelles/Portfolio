$(document).ready(function() {
    // Après 10 secondes (10000 ms), ajouter une classe à un élément
    setTimeout(function() {
        $('.slider').toggleClass('close');
    }, 0); // 10000 ms = 10 secondes
});

$(document).ready(function() {
    $('#button').click(function() {
        $('#section-to-hide').fadeOut(); // Cache la section avec un effet de fondu
    });
});
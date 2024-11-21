const scrollContainer = document.querySelector('.scroll-container');
const containerHeight = window.innerHeight;

scrollContainer.addEventListener('scroll', () => {
    const scrollTop = scrollContainer.scrollTop;

    if (scrollTop <= 0) {
        scrollContainer.scrollTop = containerHeight * 4;
    }

    if (scrollTop + containerHeight >= scrollContainer.scrollHeight) {
        scrollContainer.scrollTop = containerHeight;
    }
});

window.onload = () => {
    scrollContainer.scrollTop = containerHeight;
};



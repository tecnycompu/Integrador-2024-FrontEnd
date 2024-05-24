// animations.js

document.addEventListener("DOMContentLoaded", function() {
    // Función para verificar si un elemento está en la ventana gráfica
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Función para agregar la clase 'visible' a los elementos en la ventana gráfica
    function handleScroll() {
        var elements = document.querySelectorAll('.fade-in');
        for (var i = 0; i < elements.length; i++) {
            if (isElementInViewport(elements[i])) {
                elements[i].classList.add('visible');
            }
        }
    }

    // Escuchar el evento de desplazamiento y de carga de la página
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);
});

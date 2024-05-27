document.addEventListener('DOMContentLoaded', function() {
    // Configuración de Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'alwaysShowNavOnTouchDevices': true
    });

    // Efecto de scroll suave para enlaces internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Efecto de fade-in para la sección de galería
    const fadeInSections = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeInSections.forEach(section => {
        observer.observe(section);
    });

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

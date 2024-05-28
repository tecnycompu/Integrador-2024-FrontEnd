document.addEventListener('DOMContentLoaded', function () {
    // Configuración de Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'alwaysShowNavOnTouchDevices': true
    });

    // Efecto de scroll suave para enlaces internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetId === '') {
                // Si el targetId está vacío, desplazarse hacia arriba
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else if (targetElement) {
                // Calcular la posición del elemento teniendo en cuenta el navbar fijo
                const yOffset = -50; // Ajusta este valor según la altura de tu navbar
                const yPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({
                    top: yPosition,
                    behavior: 'smooth'
                });
            }
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

    // Botón Arriba
    var scrollTopBtn = document.getElementById('scrollTopBtn');

    // Mostrar el botón cuando el usuario se desplaza hacia abajo 20px desde la parte superior
    window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    };

    // Desplazarse hacia arriba cuando el usuario hace clic en el botón
    scrollTopBtn.addEventListener('click', function () {
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
    });

    // Manejar el envío del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(contactForm);

        fetch('send_email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.includes('Correo enviado exitosamente')) {
                Swal.fire({
                    title: 'Éxito',
                    text: data,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: data,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al enviar el correo. Inténtalo de nuevo más tarde.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        });
    });
});

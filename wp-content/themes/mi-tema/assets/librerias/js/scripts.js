document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navItems = document.querySelectorAll('.nav-links li');

    // Cambiar de estilo cuando se hace scroll en desktop
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navLinks.classList.add('nav-links-scrolled');
        } else {
            navLinks.classList.remove('nav-links-scrolled');
        }
    });

    // Mostrar/ocultar el menú hamburguesa en dispositivos móviles
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });

    // Cerrar el menú al hacer clic en un enlace (opcional)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const contentSections = document.querySelectorAll('.dashboard-section');

    // Función para mostrar la sección activa
    const showSection = (targetId) => {
        // Ocultar todas las secciones
        contentSections.forEach(section => {
            section.style.display = 'none';
        });

        // Mostrar la sección objetivo
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        // Remover la clase 'active' de todos los enlaces y añadirla al activo
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    };

    // Manejar el evento de clic en los enlaces de la barra lateral
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Previene la navegación por defecto
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                 showSection(targetId);
            } else if (targetId === 'logout') {
                 // Simulación de cierre de sesión
                 alert('Cerrando sesión administrativa.');
                 window.location.href = 'cuenta.html'; // Redirigir al login principal
            }
           
        });
    });

    // Mostrar la sección de inicio al cargar (o la sección definida en el hash URL)
    const initialSection = window.location.hash || '#inicio';
    showSection(initialSection);
});
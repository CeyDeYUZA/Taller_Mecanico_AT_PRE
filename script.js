document.addEventListener('DOMContentLoaded', () => {

    // 1. Smooth scrolling para enlaces de ancla (ej. #contacto)
    // Se aplica a todos los enlaces que empiezan con #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Verifica si el enlace es solo un # o si el elemento existe
            if (targetId.length > 1 && document.querySelector(targetId)) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Lógica del buscador de repuestos
    // Primero, verificamos si estamos en la página de repuestos
    const buscadorInput = document.getElementById('buscador-input');
    const filtroCategoria = document.getElementById('filtro-categoria');
    const repuestosGrid = document.getElementById('repuestos-grid');
    const noResultados = document.getElementById('no-resultados');

    // Si los elementos del filtro existen, ejecutamos la lógica
    if (buscadorInput && filtroCategoria && repuestosGrid) {
        
        const repuestoItems = repuestosGrid.querySelectorAll('.repuesto-item');

        const filtrarRepuestos = () => {
            const searchTerm = buscadorInput.value.toLowerCase();
            const selectedCategory = filtroCategoria.value;
            let resultadosEncontrados = 0;

            repuestoItems.forEach(item => {
                const itemTitulo = item.querySelector('h4').textContent.toLowerCase();
                const itemCategoria = item.getAttribute('data-categoria');

                // Condiciones de filtrado
                const matchBusqueda = itemTitulo.includes(searchTerm);
                const matchCategoria = (selectedCategory === 'todos') || (itemCategoria === selectedCategory);

                // Mostrar u ocultar el ítem
                if (matchBusqueda && matchCategoria) {
                    item.classList.remove('hidden');
                    resultadosEncontrados++;
                } else {
                    item.classList.add('hidden');
                }
            });

            // Mostrar u ocultar el mensaje de "No resultados"
            if (resultadosEncontrados === 0) {
                noResultados.style.display = 'block';
            } else {
                noResultados.style.display = 'none';
            }
        };

        // Añadir los "escuchadores" de eventos
        buscadorInput.addEventListener('input', filtrarRepuestos);
        filtroCategoria.addEventListener('change', filtrarRepuestos);
    }

});
// ... (Añade esto al final de tu script.js, dentro del evento DOMContentLoaded si ya lo tienes) ...

document.addEventListener('DOMContentLoaded', () => {

    // (Aquí va tu código existente de smooth scroll y filtro de repuestos)
    
    // ...

    // Lógica para el toggle de Login/Registro en cuenta.html
    const showLoginBtn = document.getElementById('show-login-btn');
    const showRegisterBtn = document.getElementById('show-register-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Comprobamos que los elementos existan (para que no dé error en otras páginas)
    if (showLoginBtn && showRegisterBtn && loginForm && registerForm) {
        
        showLoginBtn.addEventListener('click', () => {
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
            
            showLoginBtn.classList.add('active');
            showRegisterBtn.classList.remove('active');
        });

        showRegisterBtn.addEventListener('click', () => {
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
            
            showLoginBtn.classList.remove('active');
            showRegisterBtn.classList.add('active');
        });
    }

}); // Cierre del DOMContentLoaded
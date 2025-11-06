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
    const buscadorInput = document.getElementById('buscador-input');
    const filtroCategoria = document.getElementById('filtro-categoria');
    const repuestosGrid = document.getElementById('repuestos-grid');
    const noResultados = document.getElementById('no-resultados');

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

    // 3. Lógica para el toggle de Login/Registro y Simulación de Acceso Administrativo
    const showLoginBtn = document.getElementById('show-login-btn');
    const showRegisterBtn = document.getElementById('show-register-btn');
    const loginFormContainer = document.getElementById('login-form');
    const registerFormContainer = document.getElementById('register-form');
    
    // Necesitamos el formulario de login para manejar el submit
    const loginFormSubmit = document.querySelector('#login-form form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-pass');

    // --- Variables de Simulación de Administrador ---
    const ADMIN_EMAIL = 'admin@taller.com'; 
    const ADMIN_PASS = '1234'; // La contraseña simulada

    // Comprobamos que los elementos del Login/Registro existan
    if (showLoginBtn && showRegisterBtn && loginFormContainer && registerFormContainer) {
        
        // A. Lógica de Toggling (tal como la tenías)
        showLoginBtn.addEventListener('click', () => {
            loginFormContainer.classList.add('active');
            registerFormContainer.classList.remove('active');
            
            showLoginBtn.classList.add('active');
            showRegisterBtn.classList.remove('active');
        });

        showRegisterBtn.addEventListener('click', () => {
            loginFormContainer.classList.remove('active');
            registerFormContainer.classList.add('active');
            
            showLoginBtn.classList.remove('active');
            showRegisterBtn.classList.add('active');
        });
        
        // B. Lógica de Simulación de Acceso Administrativo (Nueva)
        if (loginFormSubmit) {
            loginFormSubmit.addEventListener('submit', function(e) {
                e.preventDefault(); // Detiene el envío normal del formulario
                
                const enteredEmail = emailInput.value.trim();
                const enteredPass = passwordInput.value.trim();

                if (enteredEmail === ADMIN_EMAIL && enteredPass === ADMIN_PASS) {
                    // Acceso de Administrador: Redirigir al Dashboard
                    alert('Acceso de Administrador simulado exitoso. Redirigiendo a Dashboard...');
                    window.location.href = 'admin-dashboard.html';
                } else {
                    // Acceso de Usuario Normal: Simulación (Mantener en la página o redirigir al perfil)
                    alert('Ingreso de usuario normal simulado. ¡Bienvenido!');
                    // Aquí iría window.location.href = 'perfil-usuario.html';
                }
            });
        }
    }
});
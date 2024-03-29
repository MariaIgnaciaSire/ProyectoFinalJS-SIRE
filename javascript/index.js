document.addEventListener('DOMContentLoaded', function() {
    var showLoginFormButton = document.getElementById('showLoginForm');
    var showRegistrationFormButton = document.getElementById('showRegistrationForm');
    var loginForm = document.getElementById('loginForm');
    var registrationForm = document.getElementById('registrationForm');

    // Ocultar los formularios de inicio de sesión y registro al cargar la página
    loginForm.style.display = 'none';
    registrationForm.style.display = 'none';

    // Mostrar el formulario de inicio de sesión al hacer clic en "Iniciar Sesión"
    showLoginFormButton.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'block';
        registrationForm.style.display = 'none';
    });

    // Mostrar el formulario de registro al hacer clic en "Aún no tienes cuenta? Regístrate"
    showRegistrationFormButton.addEventListener('click', function(event) {
        event.preventDefault();
        registrationForm.style.display = 'block';
        loginForm.style.display = 'none';
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        // Verificar las credenciales del usuario
        if (verificarCredenciales(username, password)) {
            // Mostrar un mensaje de éxito con Sweet Alert
            Swal.fire({
                icon: 'success',
                title: '¡Inicio de sesión exitoso!',
                text: 'Ahora puedes acceder al cotizador de cabañas.',
            }).then(function() {
                // Redirigir a la página del cotizador después de iniciar sesión
                window.location.href = './pagina/cotizador.html';
            });
        } else {
            // Mostrar un mensaje de error con Sweet Alert
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: 'Las credenciales proporcionadas son incorrectas. Por favor, inténtalo de nuevo.',
            });
        }
    });

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var regUsername = document.getElementById('regUsername').value;
        var regPassword = document.getElementById('regPassword').value;

        // Verificar si ya existen datos de usuario almacenados
        var storedUserData = JSON.parse(localStorage.getItem('userData')) || [];

        // Verificar si el nombre de usuario ya está en uso
        var existingUser = storedUserData.find(function(user) {
            return user.username === regUsername;
        });

        if (existingUser) {
            // Mostrar un mensaje de error si el nombre de usuario ya está en uso
            Swal.fire({
                icon: 'error',
                title: 'Error de registro',
                text: 'El nombre de usuario ya está en uso. Por favor, elija otro.',
            });
        } else {
            // Crear un nuevo objeto de usuario
            var newUser = {
                username: regUsername,
                password: regPassword
            };

            // Agregar el nuevo usuario al array de usuarios almacenado
            storedUserData.push(newUser);

            // Actualizar los datos de usuario en localStorage
            localStorage.setItem('userData', JSON.stringify(storedUserData));

            // Mostrar un mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: '¡Bienvenido! Tu cuenta ha sido creada exitosamente.',
            });

            // Limpiar los campos del formulario después del registro
            registrationForm.reset();
        }
    });

    // Función para verificar las credenciales del usuario
    function verificarCredenciales(username, password) {
        // Obtener los datos de usuario almacenados en localStorage
        var storedUserData = JSON.parse(localStorage.getItem('userData'));

        // Verificar si hay datos de usuario almacenados
        if (storedUserData && Array.isArray(storedUserData)) {
            // Buscar el usuario en los datos almacenados
            for (var i = 0; i < storedUserData.length; i++) {
                var storedUsername = storedUserData[i].username;
                var storedPassword = storedUserData[i].password;

                // Si se encuentra el usuario y la contraseña coincide, retornar verdadero
                if (storedUsername === username && storedPassword === password) {
                    return true;
                }
            }
        }
        // Si no se encuentra el usuario o la contraseña no coincide, retornar falso
        return false;
    }
});




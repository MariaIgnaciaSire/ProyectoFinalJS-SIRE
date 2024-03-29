// Función para cargar datos desde un archivo JSON
function cargarDatosDesdeJSON(url) {
    return fetch(url)
        .then(response => {
            // Verificar si la respuesta es exitosa (código de estado 200)
            if (!response.ok) {
                throw new Error('Error al cargar los datos.');
            }
            // Convertir la respuesta a JSON
            return response.json();
        })
        .then(data => {
            // Manejar los datos recibidos
            console.log('Datos cargados desde JSON:', data); // Agregamos este console.log para verificar los datos cargados
            return data; // Retornar los datos para que puedan ser utilizados fuera de la función
        })
        .catch(error => {
            // Manejar errores
            console.error('Error:', error);
            throw error; // Relanzar el error para que pueda ser capturado en la llamada de la promesa
        });
}

// Llamar a la función para cargar los datos desde datos.json
cargarDatosDesdeJSON('../data/datos.json')
    .then(data => {
        // Manejar los datos recibidos
        console.log('Datos recibidos:', data);

        // Por ejemplo, acceder a la lista de usuarios
        const usuarios = data.usuarios;
        usuarios.forEach(usuario => {
            console.log(`Nombre: ${usuario.nombre}, Email: ${usuario.email}`);
        });
    })
    .catch(error => {
        // Manejar errores
        console.error('Error en la carga de datos:', error);
    });


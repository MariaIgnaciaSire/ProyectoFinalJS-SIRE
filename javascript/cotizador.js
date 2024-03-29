document.addEventListener('DOMContentLoaded', function() {
    // Precios de las cabañas
    var preciosCabanas = [
        { tipo: 'pequena', precio: 40000 },
        { tipo: 'mediana', precio: 60000 },
        { tipo: 'grande', precio: 80000 }
    ];

    // Tipos de cambio
    var tiposCambio = [
        { nombre: 'pesos', abreviatura: 'CLP', factor: 1 },
        { nombre: 'dolares', abreviatura: 'USD', factor: 1 / 960 },
        { nombre: 'euros', abreviatura: 'EUR', factor: 1 / 1057 }
    ];

    // Agregar un event listener al botón para redirigir al inicio de sesión
    document.getElementById('volverInicio').addEventListener('click', function() {
        window.location.href = '../index.html';
    });

    // Event listener para el botón de calcular precio y realizar reserva
    document.getElementById('calcularPrecio').addEventListener('click', function() {
        // Obtener los valores seleccionados por el usuario
        var tipoCabana = document.getElementById('tipoCabana').value;
        var duracionEstadia = parseInt(document.getElementById('duracionEstadia').value);
        var moneda = document.getElementById('moneda').value;

        // Obtener el precio por día de la cabaña según el tipo
        var precioPorDia = obtenerPrecioCabaña(tipoCabana);

        // Calcular el precio total en CLP
        var precioTotalCLP = precioPorDia * duracionEstadia;

        // Convertir el precio total a la moneda seleccionada por el usuario
        var factorCambio = obtenerFactorCambio(moneda);
        var abreviaturaMoneda = obtenerAbreviaturaMoneda(moneda);
        var precioTotal = (precioTotalCLP * factorCambio).toLocaleString('es-CL') + ' ' + abreviaturaMoneda;

        // Mostrar el precio total en la página
        var resultadoElement = document.getElementById('resultado');
        if (resultadoElement) {
            resultadoElement.textContent = 'El precio total de la reserva es: ' + precioTotal;
        } else {
            console.error('El elemento con ID resultado no se encontró en el DOM.');
        }

        // Obtener las reservas existentes del almacenamiento local
        var reservas = JSON.parse(localStorage.getItem('reservas')) || [];

        // Agregar la nueva reserva al array de reservas
        var reserva = {
            tipoCabana: tipoCabana,
            duracionEstadia: duracionEstadia,
            moneda: moneda,
            precioTotal: precioTotal
        };
        reservas.push(reserva);

        // Guardar el array actualizado en el almacenamiento local
        localStorage.setItem('reservas', JSON.stringify(reservas));
    });

    // Función para obtener el precio de la cabaña según su tipo
    function obtenerPrecioCabaña(tipo) {
        var precio = 0;
        for (var i = 0; i < preciosCabanas.length; i++) {
            if (preciosCabanas[i].tipo === tipo) {
                precio = preciosCabanas[i].precio;
                break;
            }
        }
        return precio;
    }

    // Función para obtener el factor de cambio de la moneda
    function obtenerFactorCambio(nombreMoneda) {
        var factor = 0;
        for (var i = 0; i < tiposCambio.length; i++) {
            if (tiposCambio[i].nombre === nombreMoneda) {
                factor = tiposCambio[i].factor;
                break;
            }
        }
        return factor;
    }

    // Función para obtener la abreviatura de la moneda
    function obtenerAbreviaturaMoneda(nombreMoneda) {
        var abreviatura = '';
        for (var i = 0; i < tiposCambio.length; i++) {
            if (tiposCambio[i].nombre === nombreMoneda) {
                abreviatura = tiposCambio[i].abreviatura;
                break;
            }
        }
        return abreviatura;
    }
});

    let cantidad = 0;
    const contadorInput = document.getElementById('contador');
    const botonSumar = document.getElementById('btn-agregar');
    const botonRestar = document.getElementById('btn-quitar');

    // Función para el botón "Agregar"
    botonSumar.addEventListener('click', () => {
        cantidad++;
        contadorInput.value = cantidad;
    });

    // Función para el botón "Quitar"
    botonRestar.addEventListener('click', () => {
        if (cantidad > 0) { // Asegura que el contador no baje de 1
            cantidad--;
            contadorInput.value = cantidad;
        }
    });
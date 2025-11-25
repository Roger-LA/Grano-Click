/**
 * main.js
 * Lógica general para la Home Page de Grano & Click
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Grano & Click: Home cargado correctamente.');
    
    // Aquí podrías inicializar animaciones o cargar datos dinámicos si fuera necesario.
});

/**
 * Función para manejar el clic en "Ver Detalles".
 * Muestra un mensaje indicando que la funcionalidad está en construcción.
 * * @param {string} producto - El nombre del producto seleccionado.
 */
function verDetalles(producto) {
    // Usamos SweetAlert2 ya que está importado en el HTML
    Swal.fire({
        title: '¡Próximamente!',
        text: `Estamos preparando la página de detalles para: ${producto}`,
        icon: 'info',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#26658C',
        background: '#023859',
        color: '#ffffff'
    });

    // TODO: Cuando se cree la página de productos, cambiar esto por:
    // window.location.href = `/productos.html?id=${producto}`;
}
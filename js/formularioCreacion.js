import { cards_cafe, cardsPostre, createCards } from "./producto.js";
const form = document.getElementById('productForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    crearObjetoProducto();
});


function crearObjetoProducto() {
    const name = document.getElementById("productName").value;
    const description = document.getElementById("productDescription").value;
    const category = document.getElementById("productCategory").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const photoInput = document.getElementById("productPhoto").value;

    const nuevoIdNum = Math.floor(Date.now() / 1000);
    const productId = `${category}_${nuevoIdNum}`;
    const photoUrl = `../assets/Producto/${photoInput.split('\\').pop()}`;

    const productoModel = {
        "id": productId,
        "nombre": name,
        "categoria": category,
        "descripcion": description,
        "precio": price,
        "foto": photoUrl
    };

    const jsonString = JSON.stringify(productoModel, null, 2);
    document.getElementById('jsonOutput').textContent = jsonString;
    alert('¡Producto creado! Objeto JSON generado exitosamente.');

        guardarProductoEnLocalStorage(productoModel);

    inyectarNuevoProducto(productoModel);


    form.reset();
}

function inyectarNuevoProducto(productoModel) {
    const htmlCard = createCards([productoModel]);

    if (productoModel.categoria === "cafe") {
        if (cards_cafe) {
            cards_cafe.insertAdjacentHTML("beforeend", htmlCard);
        } else {
            console.error("Contenedor 'cards_cafe' no encontrado.");
        }
    } else if (productoModel.categoria === "pasteleria") {
        if (cardsPostre) {
            cardsPostre.insertAdjacentHTML("beforeend", htmlCard);
        } else {
            console.error("Contenedor 'cardsPostre' no encontrado.");
        }
    }
}

function guardarProductoEnLocalStorage(producto) {
    const productosGuardados = JSON.parse(localStorage.getItem('productos_locales')) || [];
    productosGuardados.push(producto);
    localStorage.setItem('productos_locales', JSON.stringify(productosGuardados));
}

function cargarProductosLocales() {
    const productosGuardados = JSON.parse(localStorage.getItem('productos_locales')) || [];
    
    if (productosGuardados.length > 0) {
        productosGuardados.forEach(producto => {
            inyectarNuevoProductoEnDOM(producto);
        });
        console.log(`Se cargaron ${productosGuardados.length} productos de localStorage.`);
    }
}
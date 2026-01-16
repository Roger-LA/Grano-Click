const cards_cafe = document.getElementById("cards_cafe");
let cafeData = [];
const cardsPostre = document.getElementById("cardsPostre");
let postreData = [];
const inpBuscar = document.getElementById("search-input");
const btnBuscar = document.getElementById("btnSearch");
const cafeTitulo = document.getElementById("coffeTitle");
const resulTitulo = document.getElementById("resultsTitle");
const pastelTitulo = document.getElementById("pastryTitle");
const noEncontrado = document.getElementById("notFound");
let contProducts = 0;
let listaDeCompras = {};

function recuperarTarjetas() {
  if (inpBuscar.value.trim() === "") {
    if (cafeTitulo) cafeTitulo.style.display = "";
    if (pastelTitulo) pastelTitulo.style.display = "";
    if (resulTitulo) resulTitulo.style.display = "none";
    if (noEncontrado) noEncontrado.style.display = "none";
    const tarjetas = document.querySelectorAll(".allCards > .col");

    tarjetas.forEach((tarjeta) => {
      tarjeta.style.display = "";
    });
  }
}

function searchText() {
  if (!inpBuscar) return;
  const textoBusqueda = inpBuscar.value.toLowerCase().trim();
  const palabrasBusqueda = textoBusqueda.split(/\s+/);

  let encontrados = false;

  if (textoBusqueda !== "") {
    if (cafeTitulo) cafeTitulo.style.display = "none";
    if (pastelTitulo) pastelTitulo.style.display = "none";
    if (resulTitulo) resulTitulo.style.display = "";
    const tarjetas = document.querySelectorAll(".allCards > .col");

    tarjetas.forEach((tarjeta) => {
      const tituloTarjeta = tarjeta.querySelector(".card-title");
      if (tituloTarjeta) {
        const tituloProducto = tituloTarjeta.textContent.toLowerCase();
        const palabrasProducto = tituloProducto.split(/\s+/);
        const encuentra = palabrasBusqueda.some((pcomunes) =>
          palabrasProducto.includes(pcomunes)
        );

        if (encuentra) {
          tarjeta.style.display = "";
          encontrados = true;
        } else {
          tarjeta.style.display = "none";
        }
      }
    });
    if (noEncontrado) noEncontrado.style.display = encontrados ? "none" : "";
  }
}
if (btnBuscar) {
  btnBuscar.addEventListener("click", function (event) {
    event.preventDefault();
    searchText();
  });
}

function validarImagen(url) {
  const defaultImage = `../assets/Producto/producto_nuevo.png`;
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(url);
    };
    img.onerror = () => {
      resolve(defaultImage);
    };
    img.src = url;
  });
}

async function getProductos() {
  try {
    // 1. Apuntamos a tu controlador de Spring Boot
    const res = await fetch("http://localhost:8080/api/productos");
    if (!res.ok) throw new Error("Error al obtener datos de la base de datos");

    const data = await res.json(); // Aquí recibimos la lista de Producto.java

    // 2. Adaptamos los datos: Java usa 'imagen_url', JS espera 'foto'
    const productosAdaptados = await Promise.all(
      data.map(async (item) => {
        // Validamos la imagen usando tu función existente
        const imagenValida = await validarImagen(item.imagen_url);

        return {
          ...item,
          foto: imagenValida, // Creamos la propiedad 'foto' que usa tu createCards
          // Forzamos minúsculas para que el filter funcione siempre (cafe, pasteleria)
          categoria: item.categoria.toLowerCase(),
        };
      })
    );

    // 3. Filtrado y renderizado (Cafe)
    cafeData = productosAdaptados.filter((item) => item.categoria === "cafe");
    if (cards_cafe) {
      cards_cafe.innerHTML = ""; // Limpiar contenido previo si fuera necesario
      cards_cafe.insertAdjacentHTML("beforeend", createCards(cafeData));
    }

    // 4. Filtrado y renderizado (Pastelería)
    postreData = productosAdaptados.filter(
      (item) =>
        item.categoria === "pasteleria" || item.categoria === "pastelería"
    );
    if (cardsPostre) {
      cardsPostre.innerHTML = "";
      cardsPostre.insertAdjacentHTML("beforeend", createCards(postreData));
    }

    cargarCantidadLS();
  } catch (error) {
    console.error("Fallo la conexión con el servidor:", error);
  }
} // getTeam

function getInfo(id) {
  const index = parseInt(id.replace("info", ""), 10) - 1;
  return cafeData[index] || null;
} //getInfo

function createCards(data) {
  let card = ``;

  for (const product of data) {
    let iconPathLeft = ``;
    let iconPathRight = ``;
    if (product.categoria === "cafe") {
      iconPathLeft = `<path d="M45.5218 28.3526C41.8246 35.1919 35.932 39.9172 30.2711 40.6633C32.8132 36.0626 34.3147 30.3427 34.3147 24.0014C34.3147 23.1308 34.3147 22.2607 34.1989 21.5148C42.9798 15.4215 44.5972 7.71219 44.8282 3.73296C50.0276 8.70625 50.4896 19.1515 45.5219 28.353L45.5218 28.3526ZM42.5176 1.99033C42.6334 4.22834 42.4018 12.1869 33.9678 18.777C33.1588 13.181 31.0794 8.08309 28.1911 4.3525C33.1595 0.6219 38.474 -0.248788 42.5176 1.98985V1.99033ZM32.1194 24.0008C32.1194 36.9327 25.1875 47.5024 16.6383 48C15.252 45.886 10.8616 37.1815 17.1004 24.6232C22.877 12.9346 20.2198 4.23023 18.2556 0.251159C26.1122 1.86711 32.12 11.9397 32.12 24.0024L32.1194 24.0008ZM15.4818 0.00158117C16.7528 2.11559 21.2584 10.9441 15.0197 23.3784C9.24303 35.067 11.9003 43.7713 13.8644 47.7504C6.0078 46.1338 0 36.0612 0 23.9992C0 11.0667 6.93186 0.497581 15.4811 0L15.4818 0.00158117Z" fill="#3F2B30" />`;
      iconPathRight = `<path d="M45.5218 28.3526C41.8246 35.1919 35.932 39.9172 30.2711 40.6633C32.8132 36.0626 34.3147 30.3427 34.3147 24.0014C34.3147 23.1308 34.3147 22.2607 34.1989 21.5148C42.9798 15.4215 44.5972 7.71219 44.8282 3.73296C50.0276 8.70625 50.4896 19.1515 45.5219 28.353L45.5218 28.3526ZM42.5176 1.99033C42.6334 4.22834 42.4018 12.1869 33.9678 18.777C33.1588 13.181 31.0794 8.08309 28.1911 4.3525C33.1595 0.6219 38.474 -0.248788 42.5176 1.98985V1.99033ZM32.1194 24.0008C32.1194 36.9327 25.1875 47.5024 16.6383 48C15.252 45.886 10.8616 37.1815 17.1004 24.6232C22.877 12.9346 20.2198 4.23023 18.2556 0.251159C26.1122 1.86711 32.12 11.9397 32.12 24.0024L32.1194 24.0008ZM15.4818 0.00158117C16.7528 2.11559 21.2584 10.9441 15.0197 23.3784C9.24303 35.067 11.9003 43.7713 13.8644 47.7504C6.0078 46.1338 0 36.0612 0 23.9992C0 11.0667 6.93186 0.497581 15.4811 0L15.4818 0.00158117Z" fill="#011C40" />`;
    } else if (product.categoria === "pasteleria") {
      iconPathLeft = `<path d="M20.2397 0C15.5927 0 10.7463 1.01029 6.89096 3.01362C3.03561 5.01743 0.000412952 8.23398 0.000412952 12.4613V33.05H0C0.00247766 33.4529 0.151966 33.8406 0.419564 34.138C0.687151 34.435 1.05345 34.6207 1.44823 34.6585L47.2527 38.9929H47.2523C47.6987 39.0353 48.1418 38.8858 48.4743 38.5796C48.8067 38.2737 48.9975 37.8402 49 37.3845V15.7128C49.002 15.4124 48.9223 15.1171 48.7695 14.86C48.6167 14.6034 48.3971 14.3942 48.1344 14.2564L20.9718 0.169593V0.170013C20.7443 0.0549123 20.4932 -0.00306342 20.2397 0.000722016L20.2397 0ZM3.1962 13.1555L45.8049 17.1854V20.961L3.1962 16.9311V13.1555ZM3.1962 20.199L45.8049 24.2289V28.5464L3.1962 24.5165V20.199ZM3.1962 27.7844L45.8049 31.8143V35.5899L3.1962 31.56V27.7844Z" fill="#3F2B30"/>`;
      iconPathRight = `<path d="M28.7603 0C33.4073 0 38.2537 1.01029 42.109 3.01362C45.9644 5.01743 48.9996 8.23398 48.9996 12.4613V33.05H49C48.9975 33.4529 48.848 33.8406 48.5804 34.138C48.3128 34.435 47.9466 34.6207 47.5518 34.6585L1.74728 38.9929H1.7477C1.30129 39.0353 0.858192 38.8858 0.525726 38.5796C0.193302 38.2737 0.00252533 37.8402 4.19617e-05 37.3845V15.7128C-0.00202179 15.4124 0.0776749 15.1171 0.230465 14.86C0.383259 14.6034 0.602947 14.3942 0.865585 14.2564L28.0282 0.169593V0.170013C28.2557 0.0549123 28.5068 -0.00306342 28.7603 0.000722016L28.7603 0ZM45.8038 13.1555L3.1951 17.1854V20.961L45.8038 16.9311V13.1555ZM45.8038 20.199L3.1951 24.2289V28.5464L45.8038 24.5165V20.199ZM45.8038 27.7844L3.1951 31.8143V35.5899L45.8038 31.56V27.7844Z" fill="#011C40"/>`;
    } else {
      iconPath = ``;
    }

    card += `
    <div class="col">
      <div class="product-card-wrapper">

        <img src="${product.foto}" class="product-image-floating" alt="${
      product.nombre
    }">

        <div class="product-info-card">
          <div class="card-body">
            <h5 class="card-title" id="nombre-${product.id}">${
      product.nombre
    }</h5>
            <p class="card-text">${product.descripcion}</p>
            <p class="card-price" id="precio-${
              product.id
            }">$${product.precio.toFixed(2)} MXN</p>
          </div>

          <div class="input-group product-quantity-control">
            <div class="input-group-prepend">
              <button type="button" class="btn btn-outline-secondary btn-agregar" data-id="${
                product.id
              }">
                <svg width="30" height="100%" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  ${iconPathLeft}
                </svg>
                Agregar +
              </button>
            </div>

            <input type="text" class="form-control text-center contador"
                   id="contador-${product.id}" value="0" readonly>

            <div class="input-group-append">
              <button type="button" class="btn btn-outline-secondary btn-quitar" data-id="${
                product.id
              }">
                - Quitar
                <svg width="30" height="100%" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  ${iconPathRight}
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
    `;
  }
  return card;
} //CrearTarjetas

function inyectarNuevoProducto(productoModel) {
  const htmlCard = createCards([productoModel]);
  const targetContainer =
    productoModel.categoria === "cafe" ? cards_cafe : cardsPostre;
  if (targetContainer) {
    targetContainer.insertAdjacentHTML("beforeend", htmlCard);
  }
}

/**
async function cargarProductosLocales() {
  const productosGuardados =
    JSON.parse(localStorage.getItem("productos_locales")) || [];

  if (productosGuardados.length === 0) {
    return;
  }

  try {
    const productosLocalesConUrlsValidas = await Promise.all(
      productosGuardados.map(async (item) => {
        const urlValida = await validarImagen(item.foto);
        return {
          ...item,
          foto: urlValida,
        };
      })
    );

    const cafeLocales = productosLocalesConUrlsValidas.filter(
      (item) => item.categoria === "cafe"
    );
    const postreLocales = productosLocalesConUrlsValidas.filter(
      (item) => item.categoria === "pasteleria"
    );

    if (cards_cafe) {
      cards_cafe.insertAdjacentHTML("beforeend", createCards(cafeLocales));
    }

    if (cardsPostre) {
      cardsPostre.insertAdjacentHTML("beforeend", createCards(postreLocales));
    }
    cargarCantidadLS();
  } catch (error) {}
}
  **/

window.addEventListener("load", async function (event) {
  event.preventDefault();
  if (cards_cafe && cardsPostre) {
    await getProductos();
    //await cargarProductosLocales();

    setTimeout(handleDeepLinkScroll, 400);
  }
});

/**
function cambiarLista(nombre, precio, cantidad) {
  listaDeCompras = JSON.parse(localStorage.getItem("products")) || {};
  let encontrado = false;
  for (const key in listaDeCompras) {
    if (listaDeCompras[key].nombre === nombre) {
      let nuevaCantidad = Number(cantidad); // conversión segura
      listaDeCompras[key].cantidad = nuevaCantidad;

      if (listaDeCompras[key].cantidad <= 0) {
        delete listaDeCompras[key];
      }
      encontrado = true;
      break;
    }
  }
  if (!encontrado) {
    let nuevoProducto = Object.keys(listaDeCompras).length + 1;
    listaDeCompras[nuevoProducto] = {
      nombre: nombre,
      precio: precio,
      cantidad: Number(cantidad),
    };
  }

  localStorage.setItem("products", JSON.stringify(listaDeCompras));
}

*/

function cambiarLista(id, nombre, precio, cantidad) {
  listaDeCompras = JSON.parse(localStorage.getItem("products")) || {};
  const idProd = id.toString();

  if (parseInt(cantidad) <= 0) {
    delete listaDeCompras[idProd];
  } else {
    listaDeCompras[idProd] = {
      id: idProd,
      nombre: nombre,
      precio: parseFloat(precio.replace(/[^0-9.-]+/g, "")),
      cantidad: Number(cantidad),
    };
  }

  localStorage.setItem("products", JSON.stringify(listaDeCompras));
}

function cargarCantidadLS() {
  const productsPrevio = JSON.parse(localStorage.getItem("products")) || {};
  const products = Array.isArray(productsPrevio)
    ? productsPrevio
    : Object.values(productsPrevio);
  const indexPorNombre = new Map();
  products.forEach((p) => {
    if (p && typeof p.nombre === "string") {
      indexPorNombre.set(p.nombre.trim(), p.cantidad ?? 0);
    }
  });
  const titles = document.querySelectorAll("h5[id^='nombre-']");
  titles.forEach((titleEl) => {
    const nombre = titleEl.textContent.trim();
    const id = titleEl.id.replace("nombre-", "");
    const input = document.getElementById(`contador-${id}`);
    if (!input) return;
    if (indexPorNombre.has(nombre)) {
      input.value = indexPorNombre.get(nombre);
    } else {
      input.value = 0;
    }
  });
}

/**
document.addEventListener("click", (e) => {
  const btnSuma = e.target.closest(".btn-agregar");
  if (btnSuma) {
    const id = btnSuma.dataset.id;
    const input = document.getElementById(`contador-${id}`);
    const name = document.getElementById(`nombre-${id}`);
    const price = document.getElementById(`precio-${id}`);
    input.value = parseInt(input.value) + 1;
    cambiarLista(name.textContent, price.textContent, input.value);
    return;
  }

  const btnResta = e.target.closest(".btn-quitar");
  if (btnResta) {
    const id = btnResta.dataset.id;
    const input = document.getElementById(`contador-${id}`);
    const name = document.getElementById(`nombre-${id}`);
    const price = document.getElementById(`precio-${id}`);
    const cantidadActual = parseInt(input.value);

    if (cantidadActual > 0) {
      input.value = cantidadActual - 1;
      cambiarLista(name.textContent, price.textContent, input.value);
    }
  }

  if (inpBuscar) {
    inpBuscar.addEventListener("input", recuperarTarjetas);
  }
});
**/

document.addEventListener("click", (e) => {
  const btnSuma = e.target.closest(".btn-agregar");
  const btnResta = e.target.closest(".btn-quitar");

  if (btnSuma || btnResta) {
    const btn = btnSuma || btnResta;
    const id = btn.dataset.id;
    const input = document.getElementById(`contador-${id}`);
    const name = document.getElementById(`nombre-${id}`).textContent;
    const price = document.getElementById(`precio-${id}`).textContent;

    if (btnSuma) {
      input.value = parseInt(input.value) + 1;
    } else {
      const cantidadActual = parseInt(input.value);
      if (cantidadActual > 0) input.value = cantidadActual - 1;
    }

    // Llamamos a la función actualizada con el ID de la base de datos
    cambiarLista(id, name, price, input.value);
  }
});
//Lógica de Deep Link Scroll

function handleDeepLinkScroll() {
  const hash = window.location.hash;
  if (hash) {
    const targetElementId = hash.substring(1);
    const targetElement = document.getElementById(targetElementId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
}

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
      console.log(`[VALIDACIÓN ÉXITO] La URL original funciona: ${url}`);
      resolve(url);
    };
    img.onerror = () => {
      console.error(`[VALIDACIÓN FALLO] La URL no cargó: ${url}. Usando: ${defaultImage}`);
      resolve(defaultImage); 
    };
    img.src = url;
  });
}

async function getProductos() {
  try {

    const res = await fetch("../data/productos.json");
    const data = await res.json();
    const productosConImagenesValidas = await Promise.all(
      data.map(async (item) => {
        const imagenValida = await validarImagen(item.foto);
        return {
          ...item,
          foto: imagenValida
        };
      })
    );



    cafeData = productosConImagenesValidas.filter((item) => item.categoria === "cafe");
    if (cards_cafe) cards_cafe.insertAdjacentHTML("beforeend", createCards(cafeData));

    postreData = productosConImagenesValidas.filter((item) => item.categoria === "pasteleria");
    if (cardsPostre) cardsPostre.insertAdjacentHTML("beforeend", createCards(postreData));

  } catch (error) {
    console.log(error.message);
  }
} // getTeam

function getInfo(id) {
  const index = parseInt(id.replace("info", ""), 10) - 1;
  return cafeData[index] || null;
} //getInfo

function createCards(data) {
  let card = ``;

  for (const product of data) {
    card += `
    <div class="col">
      <div class="product-card-wrapper">
        
        <img src="${product.foto}" class="product-image-floating" alt="${product.nombre}">
        
        <div class="product-info-card">
          <div class="card-body">
            <h5 class="card-title" id="nombre-${product.id}">${product.nombre}</h5>
            <p class="card-text">${product.descripcion}</p>
            <p class="card-price" id="precio-${product.id}">$${product.precio} MXN</p>
          </div>

          <div class="input-group product-quantity-control">
            <div class="input-group-prepend">
              <button type="button" class="btn btn-outline-secondary btn-agregar" data-id="${product.id}"><svg width="30"
                      height="100%" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M45.5218 28.3526C41.8246 35.1919 35.932 39.9172 30.2711 40.6633C32.8132 36.0626 34.3147 30.3427 34.3147 24.0014C34.3147 23.1308 34.3147 22.2607 34.1989 21.5148C42.9798 15.4215 44.5972 7.71219 44.8282 3.73296C50.0276 8.70625 50.4896 19.1515 45.5219 28.353L45.5218 28.3526ZM42.5176 1.99033C42.6334 4.22834 42.4018 12.1869 33.9678 18.777C33.1588 13.181 31.0794 8.08309 28.1911 4.3525C33.1595 0.6219 38.474 -0.248788 42.5176 1.98985V1.99033ZM32.1194 24.0008C32.1194 36.9327 25.1875 47.5024 16.6383 48C15.252 45.886 10.8616 37.1815 17.1004 24.6232C22.877 12.9346 20.2198 4.23023 18.2556 0.251159C26.1122 1.86711 32.12 11.9397 32.12 24.0024L32.1194 24.0008ZM15.4818 0.00158117C16.7528 2.11559 21.2584 10.9441 15.0197 23.3784C9.24303 35.067 11.9003 43.7713 13.8644 47.7504C6.0078 46.1338 0 36.0612 0 23.9992C0 11.0667 6.93186 0.497581 15.4811 0L15.4818 0.00158117Z"
                        fill="#3F2B30" />
                    </svg>
                Agregar +
              </button>
            </div>

            <input type="text" class="form-control text-center contador" 
                   id="contador-${product.id}" value="0" readonly>

            <div class="input-group-append">
              <button type="button" class="btn btn-outline-secondary btn-quitar" data-id="${product.id}">
                - Quitar
                <svg width="30"
                      height="100%" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3.47813 28.3526C7.17537 35.1919 13.068 39.9172 18.7288 40.6633C16.1868 36.0626 14.6852 30.3427 14.6852 24.0014C14.6852 23.1308 14.6852 22.2607 14.801 21.5148C6.02016 15.4215 4.40278 7.71219 4.17177 3.73296C-1.02764 8.70625 -1.48959 19.1512 3.47813 28.3526ZM6.48233 1.99033C6.36652 4.22834 6.59814 12.1869 15.0322 18.777C15.8411 13.181 17.9206 8.08309 20.8088 4.3525C15.8404 0.6219 10.5259 -0.248316 6.48233 1.99033ZM16.8806 24.0008C16.8806 36.9327 23.8124 47.5024 32.3617 48C33.7479 45.886 38.1383 37.1815 31.8996 24.6232C26.1229 12.9346 28.7802 4.23023 30.7443 0.251159C22.8877 1.86711 16.8799 11.9397 16.8799 24.0024L16.8806 24.0008ZM33.5182 0.00158117C32.2471 2.11559 27.7415 10.9441 33.9803 23.3784C39.7569 35.067 37.0997 43.7714 35.1355 47.7504C42.9921 46.1338 48.9999 36.0612 48.9999 23.9992C48.9999 11.0667 42.0681 0.497581 33.5188 0L33.5182 0.00158117Z"
                        fill="#011C40" />
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
  const targetContainer = (productoModel.categoria === "cafe") ? cards_cafe : cardsPostre;
  if (targetContainer) {
    targetContainer.insertAdjacentHTML("beforeend", htmlCard);
  }
}

async function cargarProductosLocales() {
  const productosGuardados = JSON.parse(localStorage.getItem('productos_locales')) || [];

  if (productosGuardados.length === 0) {
    return;
  }

  try {

    const productosLocalesConUrlsValidas = await Promise.all(
      productosGuardados.map(async (item) => {
        const urlValida = await validarImagen(item.foto);
        return {
          ...item,
          foto: urlValida 
        };
      })
    );


    const cafeLocales = productosLocalesConUrlsValidas.filter(item => item.categoria === "cafe");
    const postreLocales = productosLocalesConUrlsValidas.filter(item => item.categoria === "postre");


    if (cards_cafe) {
      cards_cafe.insertAdjacentHTML("beforeend", createCards(cafeLocales));
    }

    if (cardsPostre) {
      cardsPostre.insertAdjacentHTML("beforeend", createCards(postreLocales));
    }

  } catch (error) {

    console.error("Error al cargar y validar productos locales:", error.message);
  }
}


window.addEventListener("load", async function (event) {
  event.preventDefault();
  if (cards_cafe && cardsPostre) {
    await getProductos();
    await cargarProductosLocales();

    setTimeout(handleDeepLinkScroll, 400);
  }
});


function cambiarLista(nombre, precio, cantidad) {
  let encontrado = false;
  for (const key in listaDeCompras) {
    if (listaDeCompras[key].nombre === nombre) {
      const nuevaCantidad = Number(cantidad); // conversión segura
      listaDeCompras[key].cantidad = nuevaCantidad;

      if (nuevaCantidad === 0) {
        delete listaDeCompras[key];
      }
      encontrado = true;
      break;
    }
  }
  if (!encontrado) {
    listaDeCompras[++contProducts] = { "nombre": nombre, "precio": precio, "cantidad": Number(cantidad) };

  }

  localStorage.setItem("products", JSON.stringify(listaDeCompras));
}
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

//Lógica de Deep Link Scroll

function handleDeepLinkScroll() {
  const hash = window.location.hash;
  if (hash) {
    const targetElementId = hash.substring(1);
    const targetElement = document.getElementById(targetElementId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}



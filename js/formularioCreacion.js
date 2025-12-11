let products = [];
const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const createProductBtn = document.getElementById("createProductBtn");
const alertMessages = document.getElementById("alert-messages");
const form = document.getElementById("productForm");
const productImage = document.getElementById("productImage");
let errors = [];

let regs = {
  name: /^[A-Za-zÀ-ÿ0-9\s]{4,70}$/,
  description: /^(?=.{5,70}$)[A-Za-z0-9 ]{5,70}$/,
  price: /^(?!0)([1-9][0-9]{0,2}|[1-9]{1,2})$/, //maximo 999
  url: /^(https?:\/\/)([a-zA-Z0-9.-]+)(:[0-9]{1,5})?(\/(?!.*\s).*\.(jpg|jpeg|png|webp|svg))$/
};
function cleanAlert() {
  if (alertMessages.lastChild) {
    while (alertMessages.lastChild) {
      alertMessages.removeChild(alertMessages.lastChild);
    }
  }
}
function cleanErrors() {
  productName.style.border = "none";
  productCategory.style.border = "none";
  productDescription.style.border = "none";
  productPrice.style.border = "none";
  productImage.style.border ="none";
  cleanAlert();
  errors = [];
}


function validateField(element, regex, errorField) {
  if (!regex.test(element.value)) {
    element.style.border = "0.12rem solid red";
    errors.push(errorField);
    return false;
  }
  return true;
}
 function validateInfo() {
  let veredict = true;
  veredict &= validateField(productName, regs.name, "Nombre");
  if (productCategory.value !== "cafe" && productCategory.value !== "postre") {
    productCategory.style.border = "0.12rem solid red";
    errors.push("Categoría");
    veredict = false;
  }
  veredict &= validateField(
    productDescription,
    regs.description,
    "Descripción"
  );
  veredict &= validateField(productPrice, regs.price, "Precio");
  veredict &= validateField(productImage, regs.url, "Url") ;
  
  return veredict;
}

function productExist(name, productList) {
  name = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  for (const product of productList) {
    if (
      product.nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") === name
    )
      return true;
  }
  return false;
}

function crearObjetoProducto() {
    const category = productCategory.value;
    const nuevoIdNum = Math.floor(Date.now() / 1000);
    const productId = `${category}_${nuevoIdNum}`;
    
    // Valor por defecto ya que no hay input de foto
    const photoUrl = `../assets/Producto/producto_nuevo.png`; 

    const productoModel = {
        "id": productId,
        "nombre": productName.value,
        "categoria": category,
        "descripcion": productDescription.value,
        "precio": parseFloat(productPrice.value),
        "foto": photoUrl
    };


    guardarProductoEnLocalStorage(productoModel);

    //
}

function guardarProductoEnLocalStorage(producto) {
    const productosGuardados = JSON.parse(localStorage.getItem('productos_locales')) || [];
    productosGuardados.push(producto);
    localStorage.setItem('productos_locales', JSON.stringify(productosGuardados));
}

function addProduct() {
  fetch("../data/productos.json")
    .then((res) => res.json())
    .then((data) => {
      products = data;
      if (validateInfo()) {
        if (!productExist(productName.value, products)) {
          cleanErrors();
          crearObjetoProducto();
          alertMessages.insertAdjacentHTML(
            "beforeend",
            "<strong>Producto agregado correctamente.</strong>"
          );
          form.reset();
        } else {
          alertMessages.insertAdjacentHTML(
            "beforeend",
            `<strong> El producto ${productName.value} ya existe</strong>`
          );
        }
      } else {
        let msg = `Lo sentimos, pero los siguientes campos no son válidos: `;

        alertMessages.insertAdjacentHTML(
          "beforeend",
          "<strong>" + msg + errors.join(", ") + "</strong>"
        );
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}


createProductBtn.addEventListener("click", handleAddProductFlow);

function handleAddProductFlow() {
    cleanErrors();
    addProduct();
}

fetch("../data/productos.json")
    .then((res) => res.json())
    .then((data) => {
        products = data;
    });
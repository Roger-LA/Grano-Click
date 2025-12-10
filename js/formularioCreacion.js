let products = [];
const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const createProductBtn = document.getElementById("createProductBtn");
const alertMessages = document.getElementById("alert-messages");
let errors = [];

let regs = {
  name: /^[A-Za-zÀ-ÿ0-9\s]{4,70}$/,
  description: /^(?=.{5,70}$)[A-Za-z0-9 ]{5,70}$/,
  price: /^(?!0)([1-9][0-9]{0,2}|[1-9]{1,2})$/, //maximo 999
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
function addProduct() {
  fetch("../data/productos.json")
    .then((res) => res.json())
    .then((data) => {
      products = data;
      if (validateInfo()) {
        if (!productExist(productName.value, products)) {
          console.log("Ya se puede agregar");
          cleanErrors();
        } else {
          alertMessages.insertAdjacentHTML(
            "beforeend",
            "<strong> Ese producto ya existe</strong>"
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

createProductBtn.addEventListener("click", function () {
  cleanErrors();
  addProduct();
});

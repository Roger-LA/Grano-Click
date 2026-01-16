const btnRegresar = document.getElementById("btnRegresar");
const btnContinuar = document.getElementById("btnContinuar");
const InpTotal = document.getElementById("InpTotal");

let tabla;

function borrarProducto(id) {
  let productos = JSON.parse(localStorage.getItem("products")) || {};
  delete productos[id];
  localStorage.setItem("products", JSON.stringify(productos));
  cargarProductos();
}

function cargarProductos() {
  let productos = JSON.parse(localStorage.getItem("products")) || {};
  tabla.clear();

  let totalGeneral = 0;

  Object.keys(productos).forEach((key) => {
    let producto = productos[key];
    let precioNum = parseFloat(producto.precio.replace(/[^0-9.]/g, ""));
    let total = precioNum * producto.cantidad;

    totalGeneral += total;

    tabla.row.add([
      producto.nombre,
      producto.cantidad,
      producto.precio,
      `$${total.toFixed(2)} MXN`,
      `<div class="text-center">
     <button class="btn btn-primary btn-sm borrar-btn" data-id="${key}">
<img src="../assets/borrar.png" alt="icono para borrar articulo" width="20" height="20">
     </button>
   </div>`,
    ]);
  });

  tabla.draw();


  document.querySelectorAll(".borrar-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      let id = this.getAttribute("data-id");
      borrarProducto(id);
      sePuedePagar();
    });
  });
  InpTotal.value = `$${totalGeneral.toFixed(2)} MXN`;

  localStorage.setItem("TotalGeneral", totalGeneral);
}

function sePuedePagar() {
  const productos = JSON.parse(localStorage.getItem('products')); 
  btnContinuar.disabled = productos == null || Object.keys(productos).length === 0 ? true:false;
}

window.addEventListener("load", function () {
  tabla = $("#tablaCarrito").DataTable({
    language: {
            emptyTable: "No hay productos elegidos",
            info: "No hay cambios ni devoluciones.",
            infoEmpty: "Mostrando 0 de 0 productos elegidos"

        },
    paging: false,
    searching: false,
  });

  cargarProductos(tabla);
  sePuedePagar();
});

btnRegresar.addEventListener("click", function () {
  window.location.href = "./productos.html";
});

btnContinuar.addEventListener("click", function () {
  window.location.href = "./pago.html";
});

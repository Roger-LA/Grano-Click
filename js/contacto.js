import { API_URLS } from './urls.js';
let name = document.getElementById("nombre");
let email = document.getElementById("correo");
let phone = document.getElementById("telefono");
let msg = document.getElementById("mensaje");
let send = document.getElementById("enviar");
let respuesta = document.getElementById("respuesta");



let regs = {
  name: /^(?!.*[<>;\'\"\\\/])[A-Za-záéíóúñ]{3,}(?:[\s][A-Za-záéíóúñ]{2,}){0,98}$/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone: /^(?!0\d{2}|1\d{2}|2[0-1]\d|220)(?!(\d)\1{9}$)(?!0123456789$)(?!1234567890$)(?!9876543210$)(?!0101010101$)(?!(\d\d)\2{4}$)\d{10}$/,
  msg: /^(?!.*[<>\'\/])[A-Za-z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,;#!?¿¡]{3,300}$/,
};

function validate(reg, item) {
  const regex = new RegExp(reg);
  return regex.test(item);
}
function validateAll() {
  let veredict = true;
  let resultados = [veredict];
  if (!validate(regs["name"], name.value)) {
    resultados[0] = false;
    resultados.push("nombre");
  }
  if (!validate(regs["email"], email.value)) {
    resultados[0] = false;
    resultados.push("correo");
  }
  if (!validate(regs["phone"], phone.value)) {
    resultados[0] = false;
    resultados.push("teléfono");
  }
  if (!validate(regs["msg"], msg.value)) {
    resultados[0] = false;
    resultados.push("mensaje");
  }
  return resultados;
}

function aplicarBordeRojoGlow(campo) {
  switch (campo) {
    case "nombre":
      name.classList.add("input-invalid-glow");
      name.classList.remove("input-valid-glow");
      name.style.border = "";
      break;
    case "correo":
      email.classList.add("input-invalid-glow");
      email.classList.remove("input-valid-glow");
      email.style.border = "";
      break;
    case "teléfono":
      phone.classList.add("input-invalid-glow");
      phone.classList.remove("input-valid-glow");
      phone.style.border = "";
      break;
    case "mensaje":
      msg.classList.add("input-invalid-glow");
      msg.classList.remove("input-valid-glow");
      msg.style.border = "";
      break;
  }
}

function mostrarErrores(arr) {
  const camposInvalidos = arr.slice(1);
  camposInvalidos.forEach((campo) => {
    aplicarBordeRojoGlow(campo);
  });
  const listaCampos = camposInvalidos.map(campo => {
    const campoMayuscula = campo.charAt(0).toUpperCase() + campo.slice(1);
    return `<li>${campoMayuscula}</li>`;
  }).join("");
  const mensajeHTML = `
  <div class="custom-alert alert-error-glow">
  <p class="custom-alert-title">¡Error de Validación!</p>
  <p><strong>Lo sentimos, los siguientes campos no son válidos:</strong></p>
  <ul class="custom-alert-list">
  ${listaCampos}
  </ul>
  </div>
  `;
  respuesta.insertAdjacentHTML("beforeend", mensajeHTML);
}
const camposConReglas = [
  { input: name, reg: regs.name },
  { input: email, reg: regs.email },
  { input: phone, reg: regs.phone },
  { input: msg, reg: regs.msg },
];

function marcarBorde(input, reg) {
  const valor = input.value.trim();
  input.style.border = "";

  if (valor === "" || !reg.test(valor)) {
    input.classList.add("input-invalid-glow");
    input.classList.remove("input-valid-glow");
  } else {
    input.classList.remove("input-invalid-glow");
    input.classList.add("input-valid-glow");
  }
}

function enviarCorreo() {
  emailjs.init("Ne4BmN0pOIkYrKrtE");
  const templateParams = {
    nameClient: name.value,
    emailClient: email.value,
    phoneClient: phone.value,
    message: msg.value
  };

  emailjs.send('service_8i405gn', 'template_lnf5o9s', templateParams)
    .then(function (response) {
      respuesta.insertAdjacentHTML(
        "beforeend",
        `<div class="custom-alert alert-success-glow">
        <p class="custom-alert-title">¡Mensaje Enviado!</p>
        <p><strong>¡Gracias!</strong><br>
        Hemos recibido tu mensaje y te responderemos a la brevedad.</p>
        </div>`);
    }, function (error) {
      respuesta.insertAdjacentHTML(
        "beforeend",
        `<div class="custom-alert alert-error-glow">
        <p class="custom-alert-title">¡Error de Servicio!</p>
        <p><strong>Lo sentimos, hubo un problema.</strong><br>
      Inténtalo más tarde o contáctanos directamente.</p>
      </div>`);
    });
}

camposConReglas.forEach(({ input, reg }) => {
  input.addEventListener("input", () => {
    marcarBorde(input, reg);
  });
});

send.addEventListener("click", function (event) {
  event.preventDefault();
  const form = document.getElementById("contactForm");
  let resultados = validateAll();

  respuesta.innerHTML = '';
  if (resultados[0]) {
    enviarCorreo();
    guardar();
    form.reset();
    camposConReglas.forEach(({ input }) => {
      input.classList.remove("input-invalid-glow", "input-valid-glow");
      input.style.border = "";
    });
  } else {
    mostrarErrores(resultados, respuesta);
  }
});

async  function guardar(){

const bodyData = {
  nombre: document.getElementById("nombre").value,
  correo: email.value,
  telefono: phone.value,
  mensaje: msg.value
};

const options = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(bodyData)
};

try {
  const response = await fetch(API_URLS.contactos, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
}

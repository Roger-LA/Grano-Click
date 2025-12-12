let name = document.getElementById("nombre");
let email = document.getElementById("correo");
let phone = document.getElementById("telefono");
let msg = document.getElementById("mensaje");
let send = document.getElementById("enviar");

let regs = {
  name: /^(?!.*[<>;\'\"\\\/])[A-Za-záéíóúñ]{2,}(?:[\s][A-Za-záéíóúñ]{2,}){0,98}$/,
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

function bordesRojos(campo) {
  switch (campo) {
    case "nombre":
      name.style.border = "0.12rem solid red";
      break;
    case "correo":
      email.style.border = "0.12rem solid red";
      break;
    case "teléfono":
      phone.style.border = "0.12rem solid red";
      break;
    case "mensaje":
      msg.style.border = "0.12rem solid red";
      break;
  }
}

function mostrarErrores(arr) {
  const camposInvalidos = arr.slice(1);
  camposInvalidos.forEach((campo) => {
    bordesRojos(campo);
  });
  const listaCampos = camposInvalidos.map(campo => {
    const campoMayuscula = campo.charAt(0).toUpperCase() + campo.slice(1);
    return `<li>${campoMayuscula}</li>`;
  }).join("");
  const mensajeHTML = `
        <div class="custom-alert">
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
  if (valor === "" || !reg.test(valor)) {
    input.style.border = "0.12rem solid red";
  } else {
    input.style.border = "0.12rem solid #ced4da";
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
        `<strong>¡Gracias!<br>  
      Hemos recibido tu mensaje y te responderemos a la brevedad.</strong>`);
    }, function (error) {
      respuesta.insertAdjacentHTML(
        "beforeend",
        `<strong>¡Gracias!<br>  
      Hubo un problema al comunicarse contigo, inténtalo más tarde </strong>`);
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
  const respuesta = document.getElementById("respuesta");
  let resultados = validateAll();

  respuesta.innerHTML = '';
  if (resultados[0]) {
    enviarCorreo();
    form.reset();
    console.log("exito");
    camposConReglas.forEach(({ input }) => {
      input.style.border = "0.12rem solid #ced4da";
    });
  } else {
    mostrarErrores(resultados, respuesta);
  }
});

let name = document.getElementById("nombre");
let email = document.getElementById("correo");
let phone = document.getElementById("telefono");
let msg = document.getElementById("mensaje");
let send = document.getElementById("enviar");

let regs = {
  name: /^(?!.*[<>;\'\"\\\/])[A-Za-záéíóúñ]{2,}(?:[\s][A-Za-záéíóúñ]{2,}){0,98}$/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone: /^\d{10}$/, //// ^(?:\+52\d{10}|\d{10})$
  msg: /^(?!.*[<>\'\"\\\/])[A-Za-z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,;#!?¿¡]{0,200}$/,
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
    resultados.push("telefono");
  }
  if (!validate(regs["msg"], msg.value)) {
    resultados[0] = false;
    resultados.push("mensaje");
  }
  return resultados;
}

send.addEventListener("click", function (event) {
  event.preventDefault();
  const form = document.getElementById("contactForm");
  const respuesta = document.getElementById("respuesta");
  let resultados = validateAll();
  if (resultados[0]) {
    respuesta.innerHTML = `¡Gracias, <strong>${name.value}</strong>!  
      Hemos recibido tu mensaje y te responderemos a la brevedad.`;
    form.reset();
  } else {
    let mensaje = "";
    if (resultados.length > 2) {
      respuesta.innerHTML = `Lo sentimos, pero los campos ${resultados
        .slice(1)
        .join(", ")} no son válidos`;
    } else {
      respuesta.innerHTML = `Lo sentimos, pero el campo ${resultados
        .slice(1)
        .join(", ")} no es válido`;
    }
  }

  
});

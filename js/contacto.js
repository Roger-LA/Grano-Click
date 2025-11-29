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

const camposConReglas = [
  { input: name, reg: regs.name },
  { input: email, reg: regs.email },
  { input: phone, reg: regs.phone },
];

function marcarBorde(input, reg) {
  const valor = input.value.trim();
  if (valor === "" || !reg.test(valor)) {
    input.style.border = "2px solid red";
  } else {
    input.style.border = "2px solid #ced4da"; 
  }
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
  if (resultados[0]) {
    respuesta.innerHTML = `¡Gracias, <strong>${name.value}</strong>!  
      Hemos recibido tu mensaje y te responderemos a la brevedad.`;
    respuesta.style.color = "green";
    form.reset();

    camposConReglas.forEach(({ input }) => {
      input.style.border = "2px solid #ced4da";
    });
    msg.style.border = "2px solid #ced4da";

  } else {
    let mensaje = "";
    respuesta.style.color = "red";
    if (resultados.length > 2) {
      respuesta.innerHTML = `Lo sentimos, pero los campos ${resultados
        .slice(1)
        .join(", ")} no son válidos`;
    } else {
      respuesta.innerHTML = `Lo sentimos, pero el campo ${resultados
        .slice(1)
        .join(", ")} no es válido`;
    }
    camposConReglas.forEach(({input}) => {
      input.style.border = "2px solid #ced4da";
    });

    resultados.slice(1).forEach(campo => {
      switch (campo) {
        case "nombre":
          name.style.border = "2px solid red";
          break;
        case "correo":
          email.style.border = "2px solid red";
          break;
        case "telefono":
          phone.style.border = "2px solid red";
          break;
      }
    });
    msg.style.border = "2px solid #ced4da"; 
  }
});


import { API_URLS } from './urls.js';

const form = document.getElementById("loginForm");
const localCorreo = document.getElementById("emails");
const localPass = document.getElementById("pass");
const btnSend = document.getElementById("send");
const alertMessagesContainer = document.getElementById("alert-messages");

const regs = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  password:
    /^(?!.*(?:abc123|abcdef|abcd1234|123456|1234567|12345678|qwerty|asdfgh|zxcvbn|password|pass123|admin|usuario|welcome))(?!.*(.)\1\1)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%&*()_\-+=])(?!.*\s)[A-Za-z\d@#$%&*()_\-+=]{8,12}$/,
};

function cleanAlerts() {
  if (alertMessagesContainer) {
    while (alertMessagesContainer.firstChild) {
      alertMessagesContainer.removeChild(alertMessagesContainer.firstChild);
    }
  }
}

function applyGlowClass(element, isValid) {
  element.style.border = "";
  if (isValid) {
    element.classList.remove("input-invalid-glow");
    element.classList.add("input-valid-glow");
  } else {
    element.classList.remove("input-valid-glow");
    element.classList.add("input-invalid-glow");
  }
}

function displayAlert(title, message, isSuccess = false) {
  cleanAlerts();
  const alertClass = isSuccess ? "alert-success-glow" : "alert-error-glow";
  const html = `
    <div class="alert ${
      isSuccess ? "alert-success" : "alert-danger"
    } ${alertClass}">
      <p class="custom-alert-title">${title}</p>
      <p><strong>${message}</strong></p>
    </div>`;
  if (alertMessagesContainer) {
    alertMessagesContainer.insertAdjacentHTML("beforeend", html);
  } else {
    console.log(`ALERTA: ${title} - ${message}`);
  }
}

function validateField(element, regex, errorField) {
  const isValid = regex.test(element.value);
  applyGlowClass(element, isValid);
  return isValid;
}

function validaPrevio() {
  let veredict = true;

  const correoOk = validateField(localCorreo, regs.email, "Correo");
  veredict = correoOk;

  const passValue = localPass.value.trim();
  const passOk = passValue.length > 0;

  if (!passOk) {
    applyGlowClass(localPass, false);
  } else {
    applyGlowClass(localPass, true);
  }

  veredict = veredict && passOk;

  return veredict;
}

async function loginBackend() {
  const correo = localCorreo.value.trim();
  const password = localPass.value.trim();

  try {
    const res = await fetch(API_URLS.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo: correo, contrasena: password }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || `HTTP ${res.status}`);
    }

    const data = await res.json();

    const token = data.accessToken;

    if (!token) throw new Error("No llegó token en la respuesta");

    localStorage.setItem("authToken", token);
    localStorage.setItem("userEmail", correo);

    displayAlert("Acceso Concedido", "Sesión iniciada correctamente.", true);
    return true;
  } catch (err) {
    localStorage.removeItem("authToken");
    displayAlert(
      "Error de Acceso",
      err.message || "No se pudo iniciar sesión."
    );
    return false;
  }
}

function usuarioAceptado() {
  window.location.href = "../html/productos.html";
}

btnSend.addEventListener("click", async function (event) {
  event.preventDefault();
  cleanAlerts();

  if (!validaPrevio()) {
    displayAlert(
      "Error de Validación",
      "Por favor, completa correctamente los campos requeridos."
    );
    return;
  }

  const ok = await loginBackend();
  if (ok) {
    setTimeout(() => {
      usuarioAceptado();
      form.reset();
    }, 300);
  }
});

localCorreo.addEventListener("input", () => {
  validateField(localCorreo, regs.email, "Correo");
  applyGlowClass(localPass, localPass.value.trim().length > 0);
});

localPass.addEventListener("input", () => {
  const isValid = localPass.value.trim().length > 0;
  applyGlowClass(localPass, isValid);
});

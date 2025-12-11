
let users = [];

const form = document.getElementById("signinForm");
const userName = document.getElementById("userName");
const userLastName = document.getElementById("userLastName");
const userEmail = document.getElementById("userEmail");
const userBirthDate = document.getElementById("userBirthDate");
const userAddress = document.getElementById("userAddress");
const userPostalCode = document.getElementById("userPostalCode");
const userPassword = document.getElementById("userPassword");
const userConfirmPassword = document.getElementById("userConfirmPassword");
const btnSignin = document.getElementById("btnSignin");
const btnCancel = document.getElementById("btnCancel");

const alertMessages = document.getElementById("alert-messages");
let errors = [];

const regs = {
  name: /^[A-Za-zÀ-ÿ0-9\s]{4,70}$/,
  lastName: /^[A-Za-zÀ-ÿ0-9\s]{4,70}$/,
  email: /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/,
  address: /^[a-zA-Z0-9\s,.'#-]{3,}$/,
  postalCode: /^[0-9]{5}$/,
  password: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[~@#_*%\/.+:;=])[A-Za-z0-9~@#_*%\/.+:;=]{10,}$/
};

function cleanAlert() {
  if (alertMessages.lastChild) {
    while (alertMessages.lastChild) {
      alertMessages.removeChild(alertMessages.lastChild);
    }
  }
}

function cleanErrors() {
  userName.style.border = "none";
  userLastName.style.border = "none";
  userEmail.style.border = "none";
  userBirthDate.style.border = "none";
  userAddress.style.border ="none";
  userPostalCode.style.border = "none";
  userPassword.style.border = "none";
  userConfirmPassword.style.border ="none";
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

function isAdult(birthDateString){
    const birthDate =  new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())){
        age--;
    }//if

    return age >= 18;
}

function validateInfo() {
  let veredict = true;
  veredict &= validateField(userName, regs.name, "Nombre");
  veredict &= validateField(userLastName, regs.lastName, "Apellido");
  veredict &= validateField(userEmail, regs.email, "Correo");
  veredict &= validateField(userAddress, regs.address, "Dirección");
  veredict &= validateField(userPostalCode, regs.postalCode, "Código Postal");

  if(!userBirthDate.value){
    userBirthDate.style.border = "0.12rem solid red";
    errors.push("Fecha de nacimiento");
    veredict = false;
  }else if(!isAdult(userBirthDate.value)){
    userConfirmPassword.style.border = "0.12rem solid red";
    errors.push("Debe tener al menos 18 años");
    veredict = false;
  }//else birth

  veredict &= validateField(userPassword, regs.password, "Contraseña");

  if(userConfirmPassword.value.trim() === ""){
    userConfirmPassword.style.border = "0.12rem solid red";
    errors.push("Confirmar contraseña");
    veredict = false;
  }else if(userConfirmPassword.value !== userPassword.value){
    userConfirmPassword.style.border = "0.12rem solid red";
    errors.push("Contraseñas no coinciden");
    veredict = false;
  }//else password

  return veredict;
}

function userExist(email, userList) {
  email = email.toLowerCase().trim();
  for (const user of userList) {
    if (user.correo === email){
        return true;
    }
  }
  return false;
}

function createObjectUser() {
    const newIdNum = Math.floor(Date.now() / 1000);
    const userId = `${newIdNum}`;

    const userModel = {
        "id": userId,
        "nombre": userName.value,
        "apellido": userLastName.value,
        "correo": userEmail.value,
        "fechaNacimiento": userBirthDate.value,
        "direccion": userAddress.value,
        "codigoPostal": userPostalCode.value,
        "contraseña": userPassword.value,
    };
    saveUserInLocalStorage(userModel);
}

function saveUserInLocalStorage(user) {
    const usersSaved = JSON.parse(localStorage.getItem('usuarios')) || [];
    usersSaved.push(user);
    localStorage.setItem('usuarios', JSON.stringify(usersSaved));
}

function addUser() {
  fetch("../data/usuarios.json")
    .then((res) => res.json())
    .then((data) => {
      users = data;
      if (validateInfo()) {
        if (!userExist(userEmail.value, users)) {
          cleanErrors();
          createObjectUser();
          alertMessages.insertAdjacentHTML(
            "beforeend",
            `<div class="alert alert-success"><strong>Usuario agregado correctamente.</strong></div>`
          );
          form.reset();
        } else {
          alertMessages.insertAdjacentHTML(
            "beforeend",
            `<div class="alert alert-danger"><strong> El correo: ${userEmail.value} ya esta registrado</strong>`
          );
        }
      } else {
        let msg = `Lo sentimos, pero los siguientes campos no son válidos: `;
        alertMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-danger"><strong>${msg + errors.join(", ")}</strong>`
        );
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

btnSignin.addEventListener("click", handleAddUserFlow);

function handleAddUserFlow(event) {
    event.preventDefault();
    cleanErrors();
    addUser();
}

fetch("../data/usuarios.json")
    .then((res) => res.json())
    .then((data) => {
        users = data;
    });

btnCancel.addEventListener("click", function (event){
    event.preventDefault();
    cleanErrors();
    form.reset();
});
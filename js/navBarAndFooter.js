/*  Se necesita que en el html la pagina tenga un id en el primer div, con el con un nombre relativo a la pagina en la que se esta
por ejemplo  
<div class="container" id ="aboutUsHere">

*/

function putHTML(place, textToPut,msg) {
  let container = document.getElementById(place);
  if (container) {
    container.insertAdjacentHTML("beforeend", textToPut);
  } else {
    console.error(msg);
  }
}

function getIconPath(page,iconName){

    
    let path = "";
    if (page.id ==="indexHere") {
        path = `./assets/${iconName}`
    }else{
        path = `../assets/${iconName}`
    }
    return path;
}
function getPagePaths(page,element){
    
    let path = "";
    if ((page.id ==="indexHere"  && element ==="index.html") || (page.id !=="indexHere" && element !=="index.html")) {
        path = `./${element}`
    }else if (page.id !=="indexHere" && element ==="index.html"){
        path = `../${element}`
    }else if(page.id =="indexHere" && element !=="index.html"){
        path = `./html/${element}`
    }
    
    
    return path;
}


function buildFooter(page){
let iconPath = getIconPath(page,"LogoFooter.png");
let contactoPage = getPagePaths(page,"contacto.html");
const footer = `
  <footer class="footer-gradient py-3">
    <div class="container">
      <div class="row align-items-center flex-column flex-md-row text-center text-md-start">
        <div class="col-md-6 mb-3 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
          <a href="${contactoPage}" class="footer-brand" aria-label="Grano & Click">

            <img src="${iconPath}" alt="LogoFooter" height="35">

          </a>
          <div class="footer-copyright">© <span id="footer-year">2025</span> Todos los derechos reservados.</div>
        </div>
        <div class="col-md-6 d-flex flex-column align-items-center align-items-md-end">
          <nav class="footer-links d-flex flex-column flex-md-row gap-2">
            <a href="/html/contacto.html">Contáctanos</a>
            <a href="#" class="disabled-link" tabindex="-1" aria-disabled="true">Aviso de Privacidad</a>
          </nav>
        </div>
      </div>
    </div>
  </footer>
`;
  putHTML("footer-container", footer, "Error: No encontré el div con id 'footer-container'");
}

function buildNavBar(page){

let iconPath = getIconPath(page,"LogoBien.png"); 
let indexPage = getPagePaths(page,"index.html");
let usPage = getPagePaths(page,"sobreNosotros.html");
let contactoPage = getPagePaths(page,"contacto.html");
let productPage = getPagePaths(page,"productos.html")

const navBar = `
  <nav class="navbar navbar-dark navbar-expand-lg mt-2">
          <div class="container" id="navBar">
            <a class="navbar-brand" href="${indexPage}"> 
              <img src="${iconPath}" alt="Logo" height="35" />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#mainNavbarContent" aria-controls="mainNavbarContent"
              aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button> 
            <div class="collapse navbar-collapse" id="mainNavbarContent">
              <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="${indexPage}">Inicio </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="${productPage}">Productos</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="${contactoPage}">Contáctanos</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="${usPage}">Sobre nosotros</a>
                </li>
              </ul>
              <ul class="navbar-nav d-flex">
                <li class="nav-item">
                  <a class="nav-link" href="${logPage}">Iniciar sesión</a>
                </li>
                <li class="nav-item me-3">
                  <a class="nav-link" href="/registro.html">Registrarse</a>
                </li>
                <li class="nav-item" id="carrito">
                  <a class="btn" href="/carrito.html" role="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-cart2" viewBox="0 1.8 16 16">
                      <path
                        d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                    </svg>
                    Carrito
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
`;
  putHTML("encabezado", navBar, "Error ");
}
window.addEventListener("load", function () {
  let page = document.querySelector("div");
  buildFooter(page);
  buildNavBar(page);
});

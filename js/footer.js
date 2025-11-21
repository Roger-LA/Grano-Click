const footerEstilos = `
/* 1. Hacemos que el body ocupe AL MENOS toda la pantalla */
html, body {
  height: 100%; /* Respaldo para navegadores viejos */
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh; /* Ocupa el 100% de la altura visual */
  display: flex;
  flex-direction: column;
}

/* 2. El contenido principal CRECE para ocupar el espacio vacío */
#page-content {
  flex: 1 0 auto; /* El 1 significa que crecerá, el 0 que no encogerá */
  width: 100%;
}

/* 3. El footer se queda con su tamaño natural al final */
#footer-container {
  flex-shrink: 0; /* No dejes que el footer se aplaste */
  width: 100%;
}

/* --- TUS ESTILOS VISUALES (Sin cambios) --- */
.footer-gradient {
  background: linear-gradient(to right, #FFFFFF, #54ACBF);
  padding: 1rem 0;
}

.footer-brand {
  font-weight: 700;
  letter-spacing: 0.02rem;
  color: #011C40;
  text-decoration: none;
}

.footer-copyright {
  font-size: 0.95rem;
  color: #011C40;
  opacity: 0.92;
  margin-top: 0.5rem;
}

.footer-links a {
  color: #011C40;
  text-decoration: none;
  font-size: 0.95rem;
}

.footer-links a:hover,
.footer-links a:focus {
  color: #011101;
  text-decoration: underline;
  font-weight: bold;
}

.disabled-link {
  pointer-events: none;
  color: gray;
  cursor: default;
  text-decoration: none;
}

@media (max-width: 575.98px) {
  .footer-links {
    align-items: center;
  }
}`;

const footer = `
  <footer class="footer-gradient py-3">
    <div class="container">
      <div class="row align-items-center flex-column flex-md-row text-center text-md-start">
        <div class="col-md-6 mb-3 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
          <a href="#" class="footer-brand" aria-label="Grano & Click">

            <img src="../assets/LogoFooter.png" alt="LogoFooter" height="35"> 

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

// 1. Inyectar el CSS en el <head> del documento
const etiquetaEstilo = document.createElement('style');
etiquetaEstilo.textContent = footerEstilos;
document.head.appendChild(etiquetaEstilo);

// 2. Inyectar el HTML en el lugar correcto
const contenedorFooter = document.getElementById('footer-container');
if (contenedorFooter) {
    contenedorFooter.innerHTML = footer;
    
    // Actualizar año automáticamente (opcional)
    const yearSpan = document.getElementById('footer-year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();
    
} else {
    console.error("Error: No encontré el div con id 'footer-container'");
}
/* 
txtCuerpo = {
    title:"Nuestro café es tan humano como nuestro equipo",
    subtitle:"Cada taza tiene una historia, y aqui te contamos la nuestra",
    linkAboutUs:"Conócenos abajo",
    teamText: "Somos 6 personas con gusto por el cafe y los proyectos retadores",
    semiFootTitle:"DE nuestro equitpo a tu mesa",
    semiFootSubtitle:"Hecho con amor en México"
}
 */
/* 

h2Title = document.getElementById(title);
h3Subtitle = document.getElementById(subtitle);
aLinkAboutUs = document.getElementById(AboutUs);
pTeamText = document.getElementById(teamText);
h3SemiFootTitle = document.getElementById(semiFootTitle);
h4SemiFootSubtitle = document.getElementById(semiFootSubtitle);

    h2Title.textContent = "perro";    

window.addEventListener("load",function (params) {
      event.preventDefault();
    h2Title.textContent = "perro";    
    h3Subtitle.textContent = "datos";
}

); */

//.insertAdjacentText('beforeend',txtCuerpo["title"]);

const teamCards = document.getElementById("teamCards");

/* 
  {
    foto: "../assets/4.EmmaFoto1.png",
    nombre: "Emmanuel Aguilar",
    rol: "Desarrollador full stack",
    biografia:
      "Soy un ingeniero en Tecnologías de la Información, mi pasión e intereses principales son la Inteligencia Artificial, Visión Artificial y la interpretación de grandes datos. La orientación que quiero para mi carrera se basa en ayudar en todo lo que pueda a la sociedad, ya sea diseñando soluciones de impacto ambiental o encontrando vías alternativas a lo establecido.",
  },
  {
    foto: "../assets/2.MalenyFoto.png",
    nombre: "Maleny Dominguez",
    rol: "Desarrolladora full stack",
    biografia:
      "Desarrolladora Java Full Stack y egresada de Ingeniería en Tecnologías de la Información y Comunicación. Me apasiona crear soluciones web funcionales y bien pensadas, combinando lógica, diseño y buenas prácticas. Me impulsa la mejora continua, la curiosidad y el trabajo colaborativo. Disfruto enfrentar retos que requieren creatividad y análisis, siempre buscando aportar valor real a cada proyecto en el que participo.",
  },
  {
    foto: "../assets/3.JobFoto.png",
    nombre: "Job Hernández",
    rol: "Desarrollador full stack",
    biografia:
      "Soy puro movimiento: curiosidad, intención y diversión. Me gusta crear cosas que conecten de verdad, que se sientan auténticas y que aporten algo real. No le corro a lo nuevo ni a los retos; al contrario, me impulsan. Mantengo lo simple, lo práctico y lo auténtico, siempre buscando dejar cada proyecto mejor de como lo encontré.",
  },
  {
    foto: "../assets/5.ErickFoto.png",
    nombre: "Erick Valencia",
    rol: "Desarrollador full stack",
    biografia:
      "Desarrollador web e Ingeniero en Sistemas, apasionado por la tecnología y el aprendizaje continuo. Con experiencia en desarrollo web, bases de datos y soporte técnico, participante de proyectos retadores. Se caracteriza por su curiosidad, responsabilidad y capacidad de trabajo en equipo, siempre dispuesto a enfrentar nuevos retos.",
  },
  {
    foto: "../assets/1.BrendaFoto.png",
    nombre: "Brenda Montaño",
    rol: "Desarrolladora full stack",
    biografia:
      "Soy diseñadora de modas y actualmente me encuentro en transición hacia el mundo del desarrollo web, combinando mi visión estética y atención al detalle con habilidades tecnológicas para crear experiencias digitales funcionales y visualmente atractivas. Me apasiona la innovación y el diseño desde una perspectiva integral que une creatividad y tecnología.",
  },
  {
    foto: "../assets/6.RogelioFoto.png",
    nombre: "Rogelio Luis",
    rol: "Desarrollador full stack",
    biografia:
      "MI filosofía de vida: nunca dejar de aprender.Me formé como Ingeniero Mecánico y Eléctrico, pero mi pasión por los retos me llevó a pivotar hacia la Ciencia de Datos y el Desarrollo Full Stack. Disfruto profundamente enfrentar nuevos desafíos y siempre busco el camino más innovador para optimizar procesos.",
  },
];
 */
function getTeam() {
  let team = [];
  fetch("../data/sobreNosotros.json")
    .then((res) => res.json())
    .then((data) => {
      team = data;
      teamCards.insertAdjacentHTML("beforeend", createCards(team));
      console.log(team);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function createCards(data) {
  let card = ``;

  for (const element of data) {
    card += `
<div class="team-card col">
    <img src="${element["foto"]}" alt="${element["nombre"]}" />
    <h3>${element["nombre"]}</h3>
    <h4>${element["rol"]}</h4>
    <p>${element["biografia"]}...</p>
</div>

    `;
  }

  return card;
}

window.addEventListener("load", function (event) {
  event.preventDefault();
  getTeam();
}); 

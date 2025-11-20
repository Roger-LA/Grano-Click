
txtCuerpo = {
    title:"Nuestro café es tan humano como nuestro equipo",
    subtitle:"Cada taza tiene una historia, y aqui te contamos la nuestra",
    linkAboutUs:"Conócenos abajo",
    teamText: "Somos 6 personas con gusto por el cafe y los proyectos retadores",
    semiFootTitle:"DE nuestro equitpo a tu mesa",
    semiFootSubtitle:"Hecho con amor en México"
}



function getProducts() {
  let products = [];
  fetch("../data/sobre")
    .then((res) => res.json())
    .then((data) => {
      products = data;
      cardGroup.insertAdjacentHTML("beforeend", createCards(products));

      console.log(products);
    })
    .catch((error) => {
      console.log(error.message);
    });
}


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

);





//.insertAdjacentText('beforeend',txtCuerpo["title"]);

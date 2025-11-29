const teamCards = document.getElementById("teamCards");
let teamData = [];

function getTeam() {
  fetch("../data/sobreNosotros.json")
    .then((res) => res.json())
    .then((data) => {
      teamData = data;
      teamCards.insertAdjacentHTML("beforeend", createCards(teamData));
    })
    .catch((error) => {
      console.log(error.message);
    });
}// getTeam

function getInfo(id) {
  const index = parseInt(id.replace("info",""),10) - 1;
  return teamData[index] || null;
}//getInfo

function showInfo(id) {
  const teamMember = getInfo(id);
  if (!teamMember){
     return
  }
  const extraImg = teamMember.nombre === "Emmanuel Aguilar" ? " img-fix-emma" : "";
  Swal.fire({
    html: `<div class="swal-team-header">
      <img src="${teamMember.foto}" alt="${teamMember.nombre}" class="swal-team-img${extraImg}" />
      <h3 class="swal-team-name">${teamMember.nombre}</h3>
      <h4 class="swal-team-role">${teamMember.rol}</h4>
    </div>
    <p class="swal-team-text">${teamMember.biografia}</p>`,
    confirmButtonText: "Cerrar",
    background: "#F9F3EF",
    color: "#011C40",
    customClass:{
      popup: "swal-team-modal",
      confirmButton: "swal-team-btn",
    }
  });
}//showInfo

function createCards(data) {
  let card = ``;
  let cont = 1;

  for (const element of data) {
    card += `
    <div class="col">
      <div class="team-card">
        <img src="${element["foto"]}" alt="${element["nombre"]}" />
        <h3>${element["nombre"]}</h3>
        <h4>${element["rol"]}</h4>
        <p>${element["biografia"].slice(0, 60)}...</p>
        <button id="info${cont}" class="btn info">Ver más</button>
      </div>
    </div>
    `;
    cont++;
  }
  return card;
}//createCards

window.addEventListener("load", function (event) {
  event.preventDefault();
  getTeam();
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".info");
  if (!btn) return;
  showInfo(btn.id);
});

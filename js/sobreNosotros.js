const teamCards = document.getElementById("teamCards");
function getTeam() {
  let team = [];
  fetch("../data/sobreNosotros.json")
    .then((res) => res.json())
    .then((data) => {
      team = data;
      teamCards.insertAdjacentHTML("beforeend", createCards(team));
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function getDesciption(id, data) {
  let cont = 1;

  for (const element of data) {
    `info${cont}` === id;
    if (`info${cont}` === id) {
      return element["biografia"];
    }
    cont++;
  }
  return null;
}
function showInfo(id) {
  let team = [];
  fetch("../data/sobreNosotros.json")
    .then((res) => res.json())
    .then((data) => {
      team = data;
      let description = getDesciption(id, data);
      if (description != null) {
        Swal.fire({
          title: "Descripcion",
          text: description,
          icon: "info",
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function createCards(data) {
  let card = ``;
  let cont = 1;

  for (const element of data) {
    card += `
<div class="team-card col">
    <img src="${element["foto"]}" alt="${element["nombre"]}" />
    <h3>${element["nombre"]}</h3>
    <h4>${element["rol"]}</h4>
    <p>${element["biografia"].slice(0, 20)}...</p>
    <button id="info${cont}" class="btn btn-info info">Ver mas</button>

</div>

    `;
    cont++;
  }

  return card;
}

window.addEventListener("load", function (event) {
  event.preventDefault();
  getTeam();
});

btnsInfo = document.getElementsByClassName("info");

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".info");
  if (!btn) return;

  showInfo(btn.id);
});

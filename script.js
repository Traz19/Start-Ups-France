const startups = [
  {
    nom: "Doctolib",
    secteur: "Santé",
    montant: "500M€",
    date: "2022-03-15",
    ca: "100M€",
    effectif: 2000,
    site: "https://www.doctolib.fr"
  },
  {
    nom: "BlaBlaCar",
    secteur: "Mobilité",
    montant: "115M€",
    date: "2020-04-10",
    ca: "80M€",
    effectif: 700,
    site: "https://www.blablacar.fr"
  },
  {
    nom: "Swile",
    secteur: "RH",
    montant: "200M€",
    date: "2021-10-05",
    ca: "50M€",
    effectif: 500,
    site: "https://www.swile.co"
  },
  {
    nom: "Pigment",
    secteur: "Logiciel",
    montant: "134M€",
    date: "2024-04-04",
    ca: "Non communiqué",
    effectif: 400,
    site: "https://www.gopigment.com"
  },
  {
    nom: "Geev",
    secteur: "Économie circulaire",
    montant: "Non communiqué",
    date: "2018-06-20",
    ca: "1,3M€",
    effectif: 17,
    site: "https://www.geev.com/fr"
  }
];

const tableBody = document.querySelector("#startup-table tbody");
const searchInput = document.getElementById("search");

function displayStartups(data) {
  tableBody.innerHTML = "";
  data.forEach(startup => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${startup.nom}</td>
      <td>${startup.secteur}</td>
      <td>${startup.montant}</td>
      <td>${startup.date}</td>
      <td>${startup.ca}</td>
      <td>${startup.effectif}</td>
      <td><a href="${startup.site}" target="_blank">Visiter</a></td>
    `;
    tableBody.appendChild(row);
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = startups.filter(startup =>
    startup.nom.toLowerCase().includes(query) ||
    startup.secteur.toLowerCase().includes(query)
  );
  displayStartups(filtered);
});

displayStartups(startups);

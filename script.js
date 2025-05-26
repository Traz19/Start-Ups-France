function displayStartups(data) {
  const tableBody = document.querySelector("#startup-table tbody");
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

fetch('data/startups.csv')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n').slice(1);
    const startups = lines.filter(Boolean).map(line => {
      const [nom, secteur, montant, date, ca, effectif, site] = line.split(',');
      return { nom, secteur, montant, date, ca, effectif, site };
    });
    displayStartups(startups);
  });

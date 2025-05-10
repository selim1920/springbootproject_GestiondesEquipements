const apiUrl = 'http://localhost:9090/equipements';
const form = document.getElementById('dashboardForm');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');

window.onload = () => {
  fetch('../accueil/header.html')
    .then(res => res.text())
    .then(data => document.getElementById('header-container').innerHTML = data);

  fetch('../accueil/sidebar.html')
    .then(res => res.text())
    .then(data => document.getElementById('sidebar-container').innerHTML = data);

  fetchDashboardData();
  fetchEquipementStats();
};

function fetchDashboardData() {
  fetch(`${apiUrl}/enpanne`)
    .then(res => res.json())
    .then(data => {
      const alertContainer = document.getElementById('alert-container');
      alertContainer.innerHTML = '';
      data.forEach(eq => {
        alertContainer.innerHTML += `
          <div class="alert alert-danger">
            ⚠️ L'équipement <strong>${eq.nom}</strong> est en panne !
            <button class="close-btn" onclick="closeAlert(this)">✖️</button>
          </div>
        `;
      });
    })
    .catch(err => alert("Erreur lors du chargement des équipements en panne"));
}

function fetchEquipementStats() {
  fetch(`${apiUrl}/stats`)
    .then(res => res.json())
    .then(stats => {
      document.getElementById('totalEquipements').textContent = stats.totalEquipements;
      document.getElementById('equipementsEnPanne').textContent = stats.equipementsEnPanne;
      document.getElementById('equipementsEnFonction').textContent = stats.equipementsEnFonction;

      const ctx = document.getElementById('equipementPieChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['En Panne', 'En Fonction'],
          datasets: [{
            data: [stats.equipementsEnPanne, stats.equipementsEnFonction],
            backgroundColor: ['#dc3545', '#28a745'],
            borderColor: ['#fff', '#fff'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' },
            title: { display: true, text: 'Répartition des équipements' }
          }
        }
      });
    })
    .catch(err => alert("Erreur lors du chargement des statistiques"));
}

function closeAlert(button) {
  button.parentElement.style.display = 'none';
}

function toggleAlerts() {
  const alertContainer = document.getElementById('alert-container');
  alertContainer.style.display = (alertContainer.style.display === "none" || alertContainer.style.display === "") ? "block" : "none";
}

function openModal() {
  form.reset();
  document.getElementById('equipementId').value = '';
  modalTitle.textContent = 'Ajouter une opération';
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const id = document.getElementById('equipementId').value;
  const nom = document.getElementById('nom').value.trim();
  const etat = document.getElementById('etat').value;
  const date = document.getElementById('dateAcquisition').value;

  if (!nom || !etat || !date) {
    alert("Tous les champs sont obligatoires !");
    return;
  }

  const payload = { nom, etat, dateAcquisition: date };
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${apiUrl}/${id}` : `${apiUrl}/`;

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(res => {
    if (res.ok) {
      alert(`Équipement ${id ? "modifié" : "ajouté"} avec succès`);
      closeModal();
      fetchDashboardData();
      fetchEquipementStats();
    } else {
      alert("Une erreur s'est produite lors de l'enregistrement");
    }
  }).catch(() => alert("Erreur de communication avec le serveur"));
});
// Fetch available technicians and display them in the list
function fetchTechnicians() {
  fetch('http://localhost:9090/techniciens/disponibles')
    .then(res => res.json())
    .then(technicians => {
      const technicianList = document.getElementById('technicianList');
      technicianList.innerHTML = '';  // Clear existing list
      technicians.forEach(technician => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${technician.nom}</span>
          <span>${technician.competences}</span>
        `;
        technicianList.appendChild(li);
      });
    })
    .catch(err => alert("Erreur lors du chargement des techniciens"));
}

window.onload = () => {
  // Existing fetch functions
  fetch('../accueil/header.html')
    .then(res => res.text())
    .then(data => document.getElementById('header-container').innerHTML = data);

  fetch('../accueil/sidebar.html')
    .then(res => res.text())
    .then(data => document.getElementById('sidebar-container').innerHTML = data);

  fetchDashboardData();
  fetchEquipementStats();
  fetchTechnicians();  // Call the function to fetch technicians
};

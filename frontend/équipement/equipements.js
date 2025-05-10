const apiUrl = 'http://localhost:9090/equipements';
const form = document.getElementById('equipementForm');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');

let currentPage = 1;  // Page actuelle
const itemsPerPage = 10;  // Nombre d'équipements par page

// Fonction pour charger les équipements et appliquer la pagination
function fetchEquipements() {
  fetch(`${apiUrl}/page?page=${currentPage}&size=${itemsPerPage}`)
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById('equipementsTableBody');
      table.innerHTML = '';  // Réinitialise le contenu du tableau
      data.forEach(eq => {
           // Ajout de la classe en fonction de l'état de l'équipement
        const stateClass = eq.etat === "En fonction" ? "enfonction" : "enpanne";
        table.innerHTML += `
          <tr class="${stateClass}">
            <td>${eq.nom}</td>
            <td>${eq.etat}</td>
            <td>${eq.dateAcquisition}</td>
            <td>
              <button onclick="editEquipement(${eq.id}, '${eq.nom}', '${eq.etat}', '${eq.dateAcquisition}')">✏️ Modifier</button>
              <button onclick="deleteEquipement(${eq.id})">🗑️ Supprimer</button>
            </td>
          </tr>
        `;
      });

      // Mise à jour de la pagination
      document.getElementById('pageNumber').textContent = `Page ${currentPage}`;
      document.getElementById('prevPage').disabled = currentPage === 1;
      document.getElementById('nextPage').disabled = data.length < itemsPerPage;
    })
    .catch(err => alert("Erreur lors du chargement des équipements"));
}

// Fonction pour changer de page
function changePage(direction) {
  if (direction === 'next') {
    currentPage++;
  } else if (direction === 'prev') {
    currentPage--;
  }
  fetchEquipements();
}

// Fonction de recherche des équipements
function searchEquipements() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  fetch(`${apiUrl}/search?query=${searchTerm}`)
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById('equipementsTableBody');
      table.innerHTML = '';  // Réinitialise le contenu du tableau
      data.forEach(eq => {
        // Ajout de la classe en fonction de l'état de l'équipement
        const stateClass = eq.etat === "En fonction" ? "enfonction" : "enpanne";
        table.innerHTML += `
          <tr class="${stateClass}">
            <td>${eq.nom}</td>
            <td>${eq.etat}</td>
            <td>${eq.dateAcquisition}</td>
            <td>
              <button onclick="editEquipement(${eq.id}, '${eq.nom}', '${eq.etat}', '${eq.dateAcquisition}')">✏️ Modifier</button>
              <button onclick="deleteEquipement(${eq.id})">🗑️ Supprimer</button>
            </td>
          </tr>
        `;
      });
    })
    .catch(err => alert("Erreur de recherche"));
}

// Ouvrir la modal
function openModal() {
  form.reset();
  document.getElementById('equipementId').value = '';
  modalTitle.textContent = 'Ajouter un équipement';
  modal.classList.remove('hidden');
}

// Fermer la modal
function closeModal() {
  modal.classList.add('hidden');
}

// Modifier un équipement
function editEquipement(id, nom, etat, date) {
  document.getElementById('equipementId').value = id;
  document.getElementById('nom').value = nom;
  document.getElementById('etat').value = etat;
  document.getElementById('dateAcquisition').value = date;
  modalTitle.textContent = 'Modifier un équipement';
  modal.classList.remove('hidden');
}

// Supprimer un équipement
function deleteEquipement(id) {
  if (confirm('Voulez-vous vraiment supprimer cet équipement ?')) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          alert("Équipement supprimé avec succès");
          fetchEquipements();
        } else {
          alert("Erreur lors de la suppression");
        }
      });
  }
}

// Soumettre le formulaire
form.addEventListener('submit', function(e) {
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
  const url = id ? `${apiUrl}/${id}` : apiUrl + '/';

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(res => {
    if (res.ok) {
      alert(`Équipement ${id ? "modifié" : "ajouté"} avec succès`);
      closeModal();
      fetchEquipements();
    } else {
      alert("Une erreur s'est produite lors de l'enregistrement");
    }
  }).catch(() => {
    alert("Erreur de communication avec le serveur");
  });
});

// Charger les équipements à la première ouverture
fetchEquipements();

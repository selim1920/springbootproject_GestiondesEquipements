const apiUrl = 'http://localhost:9090/interventions';
const form = document.getElementById('interventionForm');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');

function fetchInterventions() {
  fetch(apiUrl + '/')
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById('interventionsTableBody');
      table.innerHTML = '';
      data.forEach(i => {
        const isTerminee = i.statut === 'terminée';
        table.innerHTML += `
          <tr class="${isTerminee ? 'terminée' : ''}">
            <td>${i.id}</td>
            <td>${i.equipement.nom}</td>
            <td>${i.technicien.nom}</td>
            <td>${isTerminee ? '✅ Terminée' : i.statut}</td>
            <td>${i.date}</td>
            <td>${i.cout} €</td>
            <td>
              <button onclick="editIntervention(${i.id})">✏️</button>
              <button onclick="deleteIntervention(${i.id})">🗑️</button>
              ${isTerminee
                ? `<button class="terminer" disabled style="opacity: 0.5;">✅ Terminée</button>`
                : `<button class="terminer" onclick="terminerIntervention(${i.id})">✅ Terminer</button>`}
            </td>
          </tr>`;
      });
    });
}

function terminerIntervention(id) {
  if (confirm("Voulez-vous vraiment marquer cette intervention comme terminée ?")) {
    fetch(`${apiUrl}/terminer/${id}`, {
      method: 'PUT'
    })
    .then(res => {
      if (res.ok) {
        alert("✅ Intervention terminée avec succès !");
        fetchInterventions();
        loadTechniciensDisponibles();
      } else {
        alert("❌ Une erreur s'est produite.");
      }
    })
    .catch(() => alert("❌ Erreur de connexion au serveur."));
  }
}

function openModal() {
  form.reset();
  document.getElementById('interventionId').value = '';
  modalTitle.textContent = 'Nouvelle intervention';
  loadEquipements();
  loadTechniciensDisponibles();
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

function editIntervention(id) {
  fetch(`${apiUrl}/${id}`)
    .then(res => res.json())
    .then(i => {
      document.getElementById('interventionId').value = i.id;
      document.getElementById('equipementId').value = i.equipement.id;
      document.getElementById('technicienId').value = i.technicien.id;
      document.getElementById('statut').value = i.statut;
      document.getElementById('date').value = i.date;
      document.getElementById('cout').value = i.cout;
      modalTitle.textContent = 'Modifier intervention';
      modal.classList.remove('hidden');
    });
}

function deleteIntervention(id) {
  fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(() => fetchInterventions());
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const id = document.getElementById('interventionId').value;
  const payload = {
    equipement: { id: document.getElementById('equipementId').value },
    technicien: { id: document.getElementById('technicienId').value },
    statut: document.getElementById('statut').value,
    date: document.getElementById('date').value,
    cout: document.getElementById('cout').value,
  };
  const url = id ? `${apiUrl}/${id}` : `${apiUrl}/`;
  const method = id ? 'PUT' : 'POST';

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(() => {
    closeModal();
    fetchInterventions();
    loadTechniciensDisponibles();
  });
});

function loadEquipements() {
  fetch('http://localhost:9090/equipements/enpanne')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('equipementId');
      select.innerHTML = data.map(e => `<option value="${e.id}">${e.nom}</option>`).join('');
    });
}

function loadTechniciensDisponibles() {
  fetch('http://localhost:9090/techniciens/disponibles')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('technicienId');
      select.innerHTML = data.map(t => `<option value="${t.id}">${t.nom}</option>`).join('');
    })
    .catch(() => alert("Erreur de chargement des techniciens disponibles"));
}

fetchInterventions();

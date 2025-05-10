const apiUrl = 'http://localhost:9090/techniciens';
const form = document.getElementById('technicienForm');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');

function fetchTechniciens() {
  fetch(apiUrl + '/')
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById('techniciensTableBody');
      table.innerHTML = '';
      data.forEach(t => {
        const dispoBadge = t.disponibilite
          ? `<span style="color: green; font-weight: bold;">🟢 Disponible</span>`
          : `<span style="color: red; font-weight: bold;">🔴 Indisponible</span>`;

        table.innerHTML += `
          <tr>
            <td>${t.id}</td>
            <td>${t.nom}</td>
            <td>${t.competences}</td>
            <td>${dispoBadge}</td>
            <td>
              <button onclick="editTechnicien(${t.id})">✏️</button>
              <button onclick="deleteTechnicien(${t.id})">🗑️</button>
            </td>
          </tr>`;
      });
    });
}

function openModal() {
  form.reset();
  document.getElementById('technicienId').value = '';
  modalTitle.textContent = 'Nouveau technicien';
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

function editTechnicien(id) {
  fetch(`${apiUrl}/${id}`)
    .then(res => res.json())
    .then(t => {
      document.getElementById('technicienId').value = t.id;
      document.getElementById('nom').value = t.nom;
      document.getElementById('competences').value = t.competences;
      document.getElementById('disponibilite').value = t.disponibilite.toString();
      modalTitle.textContent = 'Modifier technicien';
      modal.classList.remove('hidden');
    });
}

function deleteTechnicien(id) {
  if (confirm("Voulez-vous vraiment supprimer ce technicien ?")) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
      .then(() => fetchTechniciens());
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const id = document.getElementById('technicienId').value;
  const payload = {
    nom: document.getElementById('nom').value.trim(),
    competences: document.getElementById('competences').value.trim(),
    disponibilite: document.getElementById('disponibilite').value === 'true'
  };

  const url = id ? `${apiUrl}/${id}` : `${apiUrl}/`;
  const method = id ? 'PUT' : 'POST';

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(() => {
    closeModal();
    fetchTechniciens();
  });
});

fetchTechniciens();

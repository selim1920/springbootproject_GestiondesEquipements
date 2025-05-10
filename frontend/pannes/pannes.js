const apiUrl = 'http://localhost:9090/pannes';
const equipementApi = 'http://localhost:9090/equipements';
const form = document.getElementById('panneForm');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');

function fetchPannes() {
  fetch(apiUrl + '/')
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById('pannesTableBody');
      table.innerHTML = '';
      data.forEach(p => {
        table.innerHTML += `
          <tr>
            <td>${p.id}</td>
            <td>${p.description}</td>
            <td>${p.categorie}</td>
            <td>${p.equipement?.nom || 'N/A'}</td>
            <td>${p.dateSignalement}</td>
            <td>
              <button onclick="editPanne(${p.id}, '${p.description}', '${p.categorie}', ${p.equipement?.id}, '${p.dateSignalement}')">✏️</button>
              <button onclick="deletePanne(${p.id})">🗑️</button>
            </td>
          </tr>
        `;
      });
    });
}

function loadEquipements() {
  fetch('http://localhost:9090/equipements/enfonction')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('equipementId');
      select.innerHTML = '<option value="">-- Choisir un équipement --</option>';
      data.forEach(eq => {
        select.innerHTML += `<option value="${eq.id}">${eq.nom}</option>`;
      });
    });
}


function openModal() {
  form.reset();
  document.getElementById('panneId').value = '';
  modalTitle.textContent = 'Signaler une panne';
  modal.classList.remove('hidden');
  loadEquipements();
}

function closeModal() {
  modal.classList.add('hidden');
}

function editPanne(id, description, categorie, equipementId, dateSignalement) {
  document.getElementById('panneId').value = id;
  document.getElementById('description').value = description;
  document.getElementById('categorie').value = categorie;
  document.getElementById('equipementId').value = equipementId;
  document.getElementById('dateSignalement').value = dateSignalement;
  modalTitle.textContent = 'Modifier la panne';
  modal.classList.remove('hidden');
  loadEquipements();
}

function deletePanne(id) {
  fetch(`${apiUrl}/${id}`, { method: 'DELETE' }).then(() => fetchPannes());
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const id = document.getElementById('panneId').value;
  const payload = {
    description: document.getElementById('description').value,
    categorie: document.getElementById('categorie').value,
    equipement: { id: document.getElementById('equipementId').value },
    dateSignalement: document.getElementById('dateSignalement').value
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${apiUrl}/${id}` : apiUrl + '/';

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(() => {
    closeModal();
    fetchPannes();
  });
});

fetchPannes();

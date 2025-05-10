const apiUrl = 'http://localhost:9090/utilisateurs';
const form = document.getElementById('utilisateurForm');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');

function fetchUtilisateurs() {
  fetch(apiUrl + '/')
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById('utilisateursTableBody');
      table.innerHTML = '';
      data.forEach(u => {
        table.innerHTML += `
          <tr>
            <td>${u.id}</td>
            <td>${u.nom}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
            <td>
              <input type="password" id="password-${u.id}" value="${u.motDePasse}" disabled>
              <button onclick="togglePasswordVisibility(${u.id})">👁️ Voir mot de passe</button>
            </td>
            <td>
              <button onclick="editUtilisateur(${u.id}, '${u.nom}', '${u.email}', '${u.role}')">✏️ Modifier</button>
              <button onclick="deleteUtilisateur(${u.id})">🗑️ Supprimer</button>
            </td>
          </tr>
        `;
      });
    });
}

// Affiche ou masque le mot de passe
function togglePasswordVisibility(id) {
  const passwordField = document.getElementById(`password-${id}`);
  const iconButton = document.querySelector(`#password-${id}`).nextElementSibling;

  if (passwordField.type === "password") {
    passwordField.type = "text";
    iconButton.textContent = "🙈 Masquer mot de passe";
  } else {
    passwordField.type = "password";
    iconButton.textContent = "👁️ Voir mot de passe";
  }
}

function openModal() {
  form.reset();
  document.getElementById('utilisateurId').value = '';
  modalTitle.textContent = 'Ajouter un utilisateur';
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

function editUtilisateur(id, nom, email, role) {
  document.getElementById('utilisateurId').value = id;
  document.getElementById('nom').value = nom;
  document.getElementById('email').value = email;
  document.getElementById('role').value = role;
  modalTitle.textContent = 'Modifier un utilisateur';
  modal.classList.remove('hidden');
}

function deleteUtilisateur(id) {
  fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(() => fetchUtilisateurs());
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const id = document.getElementById('utilisateurId').value;
  const nom = document.getElementById('nom').value;
  const email = document.getElementById('email').value;
  const motDePasse = document.getElementById('motDePasse').value;
  const role = document.getElementById('role').value;
  const payload = { nom, email, motDePasse, role };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${apiUrl}/${id}` : apiUrl + '/';

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(() => {
    closeModal();
    fetchUtilisateurs();
  });
});

fetchUtilisateurs();

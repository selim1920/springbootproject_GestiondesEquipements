// API URL
const apiUrl = "http://localhost:9090/utilisateurs";

// DOM elements
const loginFormElement = document.getElementById('loginFormElement');
const registerFormElement = document.getElementById('registerFormElement');

// Form submission - Login
loginFormElement.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get user inputs
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Send login request to backend
    fetch(`${apiUrl}/`)
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.email === email && u.motDePasse === password);
            if (user) {
                alert(`Connexion réussie! Bienvenue ${user.nom}`);
                // Redirect to dashboard
                window.location.href = 'http://127.0.0.1:5500/accueil/dashboard.html';
            } else {
                alert("Email ou mot de passe incorrect");
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
            alert("Erreur de connexion. Veuillez réessayer.");
        });
});

// Form submission - Register
registerFormElement.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
    }

    // Create new user object
    const newUser = {
        nom: name,
        email: email,
        motDePasse: password,
        role: "user"  // default role
    };

    // Send POST request to create a new user
    fetch(apiUrl + '/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
    .then(response => response.json())
    .then(data => {
        alert("Inscription réussie! Vous pouvez maintenant vous connecter.");
        // Switch to login form
        showLogin();
        registerFormElement.reset();
    })
    .catch(error => {
        console.error("Error during registration:", error);
        alert("Erreur d'inscription. Veuillez réessayer.");
    });
});

// Switch forms
function showLogin() {
    document.getElementById('loginTab').classList.add('text-blue-600', 'bg-blue-50');
    document.getElementById('registerTab').classList.remove('text-blue-600', 'bg-blue-50');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
}

function showRegister() {
    document.getElementById('registerTab').classList.add('text-blue-600', 'bg-blue-50');
    document.getElementById('loginTab').classList.remove('text-blue-600', 'bg-blue-50');
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
}

// Switch between Login and Register
document.getElementById('loginTab').addEventListener('click', showLogin);
document.getElementById('registerTab').addEventListener('click', showRegister);
document.getElementById('switchToRegister').addEventListener('click', showRegister);
document.getElementById('switchToLogin').addEventListener('click', showLogin);

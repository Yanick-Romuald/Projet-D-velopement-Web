document.addEventListener("DOMContentLoaded", function() {

  let topMenu = document.getElementById("topMenu");
  let contenu = document.getElementById("contenu");
  let loginBtn = document.getElementById("loginbutton");
  let logoutBtn = document.getElementById("logoutbutton");

  // --- État initial ---
  if (topMenu) topMenu.style.display = "none";
  if (contenu) contenu.style.display = "none";
  if (loginBtn) loginBtn.style.display = "inline-block";
  if (logoutBtn) logoutBtn.style.display = "none";

  // --- Si l'utilisateur est connecté ---
  if (localStorage.getItem("loggedInUser")) {
    if (topMenu) topMenu.style.display = "block";
    if (contenu) contenu.style.display = "block";
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  }

  // --- Bouton Connexion ---
  if (loginBtn) {
    loginBtn.addEventListener("click", function() {
      window.location.href = "html/login.html";
    });
  }

  // --- Bouton Déconnexion ---
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
  }

  // --- Formulaire d'inscription ---
  let signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
      event.preventDefault();

      let username = document.getElementById("username").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      let confirmPassword = document.getElementById("confirmpassword").value;

      if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      localStorage.setItem("loggedInUser", email);
      alert("Inscription réussie !");
      window.location.href = "../index.html";
    });
  }

  // --- Formulaire de connexion ---
  let loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();

      let email = document.getElementById("loginEmail").value;
      let password = document.getElementById("loginPassword").value;

      let users = JSON.parse(localStorage.getItem("users") || "[]");
      let found = users.find(u => u.email === email && u.password === password);

      if (found) {
        localStorage.setItem("loggedInUser", email);
        alert("Connexion réussie !");
        window.location.href = "../index.html";
      } else {
        alert("Email ou mot de passe incorrect !");
      }
    });
  }

});

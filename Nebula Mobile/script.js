document.addEventListener("DOMContentLoaded", function() {
  let topMenu = document.getElementById("topMenu");
  let loginBtn = document.getElementById("loginbutton");

  // Hide menu and logout button by default
  if(topMenu) topMenu.style.display = "none";
  if(contenu) contenu.style.display = "none"
  if(loginBtn) loginBtn.style.display = "inline-block";

  // Show menu and logout if user is logged in
  if(localStorage.getItem("loggedInUser")) {
    if (contenu) contenu.style.display = "block"
    if(topMenu) topMenu.style.display = "block";
    if(loginBtn) loginBtn.style.display = "none";
  }

  // Login button goes to login page
  if(loginBtn) {
    loginBtn.addEventListener("click", function() {
      window.location.href = "html/login.html";
    });
  }
  // Signup form
  let signupForm = document.getElementById("signupForm");
  if(signupForm) {
    signupForm.addEventListener("submit", function(event) {
      event.preventDefault();
      let username = document.getElementById("username").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      let confirmPassword = document.getElementById("confirmpassword").value;

      if(password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push({username: username, email: email, password: password});
      localStorage.setItem("users", JSON.stringify(users));

      localStorage.setItem("loggedInUser", email);
      alert("Inscription réussie !");
      window.location.href = "../index.html";
    });
  }

  // Login form
  let loginForm = document.getElementById("loginForm");
  if(loginForm) {
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
      let email = document.getElementById("loginEmail").value;
      let password = document.getElementById("loginPassword").value;

      let users = JSON.parse(localStorage.getItem("users") || "[]");
      let found = users.find(u => u.email === email && u.password === password);

      if(found) {
        localStorage.setItem("loggedInUser", email);
        alert("Connexion réussie !");
        window.location.href = "../index.html";
      } else {
        alert("Email ou mot de passe incorrect !");
      }
    });
  }
});

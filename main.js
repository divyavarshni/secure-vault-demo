const app = document.getElementById("app");

let user = localStorage.getItem("user");

function renderLogin() {
  app.innerHTML = `
    <div class="center">
      <div class="glass">
        <h2>🔐 Secure Vault Login</h2>
        <input id="username" placeholder="Username" />
        <br/>
        <input id="password" type="password" placeholder="Password" />
        <br/>
        <button onclick="login()">Login</button>
      </div>
    </div>
  `;
}

function renderDashboard() {
  app.innerHTML = `
    <div class="container">
      <div class="topbar">
        <h2>🔐 Secure Personal Vault</h2>
        <button onclick="logout()">Logout</button>
      </div>

      <input id="search" placeholder="Search vault..." onkeyup="filter()" />

      <div class="grid" id="grid">
        ${generateCards()}
      </div>
    </div>
  `;
}

function generateCards() {
  const items = [
    { title: "Passwords", desc: "Encrypted login credentials" },
    { title: "Bank Info", desc: "Secure financial data" },
    { title: "Private Notes", desc: "Personal encrypted notes" },
    { title: "Documents", desc: "Stored files safely" },
    { title: "API Keys", desc: "Developer secrets vault" },
    { title: "Activity Logs", desc: "System tracking history" }
  ];

  return items.map(i => `
    <div class="card">
      <h3>${i.title}</h3>
      <p>${i.desc}</p>
    </div>
  `).join("");
}

window.login = function () {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  if (u && p) {
    localStorage.setItem("user", u);
    user = u;
    renderDashboard();
  } else {
    alert("Enter credentials");
  }
};

window.logout = function () {
  localStorage.removeItem("user");
  user = null;
  renderLogin();
};

window.filter = function () {
  const val = document.getElementById("search").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(c => {
    c.style.display = c.innerText.toLowerCase().includes(val)
      ? "block"
      : "none";
  });
};

// INIT
if (user) renderDashboard();
else renderLogin();

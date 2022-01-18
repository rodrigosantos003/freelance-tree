/*---------------------------------------
              GENERAL            
  -----------------------------------------*/
//hide navbar with scroll
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50%";
  }
  prevScrollpos = currentScrollPos;
};

/*---------------------------------------
              ACCOUNTS            
  -----------------------------------------*/
var storageSize = localStorage.length;

function listAccounts() {
  let accounts = [];

  for (let i = 1; i <= storageSize; i++) {
    accounts.push(JSON.parse(localStorage.getItem(i)));
  }

  return accounts;
}

//sign up
function signUp() {
  let name = document.getElementById("signup-name").value;
  let email = document.getElementById("signup-email").value;
  let password = document.getElementById("signup-password").value;
  let typeFreelancer = document.querySelector("#freelancer");
  let typeClient = document.querySelector("#client");

  if (
    name != "" &&
    email != "" &&
    password != "" &&
    (typeFreelancer.checked || typeClient.checked)
  ) {
    if (typeFreelancer.checked) {
      localStorage.setItem(
        storageSize + 1,
        JSON.stringify([name, email, password, "freelancer", []])
      );
    } else {
      localStorage.setItem(
        storageSize + 1,
        JSON.stringify([name, email, password, "client", []])
      );
    }

    alert("Conta criada com sucesso!");

    document.getElementById("signup-name").value = "";
    document.getElementById("signup-email").value = "";
    document.getElementById("signup-password").value = "";
    document.querySelector("#freelancer").checked = false;
    document.querySelector("#client").checked = false;

    window.open("../login.html", "_self");
  } else alert("Os campos têm de estar preenchidos!");
}

//log in
function logIn() {
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;

  let accounts = listAccounts();

  let found = false;

  if (email != "" && password != "") {
    for (let k = 0; k < accounts.length; k++) {
      if (accounts[k][1] == email && accounts[k][2] == password) {
        found = true;
        sessionStorage.setItem("currentLogin", email);
        if (accounts[k][3] == "freelancer") {
          window.open("../freelancer.html", "_self");
        } else {
          window.open("../client.html", "_self");
        }
      }
    }

    if (!found) {
      alert("Os dados estão incorretos!");
    }

    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
  } else alert("Os campos têm de estar preenchidos!");
}

//logout
function logOut() {
  sessionStorage.removeItem("currentLogin");
  window.open("../index.html", "_self");
}

//add project do an account
function addProject(title, description) {
  let accounts = listAccounts();

  let projects = [];

  for (let k = 0; k < accounts.length; k++) {
    if (accounts[k][1] == sessionStorage.getItem("currentLogin")) {
      for (let m = 0; m < accounts[k][4].length; m++) {
        projects.push(accounts[k][4][m]);
      }

      projects.push([title, description]);

      localStorage.setItem(
        k + 1,
        JSON.stringify([
          accounts[k][0],
          accounts[k][1],
          accounts[k][2],
          accounts[k][3],
          projects,
        ])
      );

      alert("Projeto adicionado com sucesso!");
    }
  }
}

function forgotPassword() {
  let accounts = listAccounts();
  let projects = [];
  let user = prompt("Introduza o seu email");

  for (let x = 0; x < accounts.length; x++) {
    if (accounts[x][1] == user) {
      let password = prompt("Introduza a nova password");
      accounts[x][2] = password;

      for (let k = 0; k < accounts[x][4].length; k++) {
        projects.push(accounts[x][4][k]);
      }

      localStorage.setItem(
        x + 1,
        JSON.stringify([
          accounts[x][0],
          accounts[x][1],
          accounts[x][2],
          accounts[x][3],
          projects,
        ])
      );

      alert("Password modificada com sucesso!");
    }
  }
}

function createOffer() {
  let title = document.getElementById("client-name").innerHTML;
  let description = prompt("Introduza a descrição do projeto");
  let category;

  do {
    category = prompt("Introduza a categoria do projeto");

    if (
      category != "Negócios" &&
      category != "Dados" &&
      category != "Marketing Digital" &&
      category != "Gráficos e Design" &&
      category != "Música e Áudio" &&
      category != "Programação e Tech" &&
      category != "Vídeo e Animação" &&
      category != "Escrita e Redação"
    ) {
      alert(
        "Introduza uma categoria válida!\nNegócios | Dados | Marketing Digital | Gráficos e Design | Música e Áudio | Programação e Tech | Vídeo e Animação | Escrita e Redação"
      );
    }
  } while (
    category != "Negócios" &&
    category != "Dados" &&
    category != "Marketing Digital" &&
    category != "Gráficos e Design" &&
    category != "Música e Áudio" &&
    category != "Programação e Tech" &&
    category != "Vídeo e Animação" &&
    category != "Escrita e Redação"
  );

  let accounts = [];
  let offers = [];

  for (let i = 1; i <= localStorage.length; i++) {
    accounts.push(JSON.parse(localStorage.getItem(i)));
  }

  for (let k = 0; k < accounts.length; k++) {
    if (accounts[k][1] == sessionStorage.getItem("currentLogin")) {
      for (let m = 0; m < accounts[k][4].length; m++) {
        offers.push(accounts[k][4][m]);
      }

      offers.push([title, description, category]);

      localStorage.setItem(
        k + 1,
        JSON.stringify([
          accounts[k][0],
          accounts[k][1],
          accounts[k][2],
          accounts[k][3],
          offers,
        ])
      );
    }
  }

  location.reload();
}

//open popup
function openInfo(id) {
  document.getElementById(id).style.display = "block";
}

//close popup
function closeInfo(id) {
  document.getElementById(id).style.display = "none";
}

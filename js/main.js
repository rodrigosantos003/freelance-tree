//ESCONDER NAVBAR COM SCROLL
var prevScrollpos = window.pageYOffset; /*obter a posição vertical da janela*/

/*ação quando o user faz scroll*/
window.onscroll = function () {
  var currentScrollPos =
    window.pageYOffset; /*obter a posição vertical atual da janela*/
  if (prevScrollpos > currentScrollPos) {
    /*se a posição anterior for maior que a atual*/
    document.getElementById("navbar").style.top =
      "0"; /*manter a posição da navbar*/
  } else {
    document.getElementById("navbar").style.top =
      "-50%"; /*senão esconde a navbar*/
  }
  prevScrollpos =
    currentScrollPos; /*atribuição da posição atual da janela à anterior*/
};

var storageSize = localStorage.length; /*tamanho do armazenamento local*/

//LISTAR CONTAS
function listAccounts() {
  let accounts = [];

  /*percorre todo o armazenamento local para armazenar os dados das contas no array*/
  for (let i = 1; i <= storageSize; i++) {
    accounts.push(JSON.parse(localStorage.getItem(i)));
  }

  /*retorna o array de contas*/
  return accounts;
}

//REGISTO
function signUp() {
  /*obter valores dos campos do form*/
  let name = document.getElementById("signup-name").value;
  let email = document.getElementById("signup-email").value;
  let password = document.getElementById("signup-password").value;
  let typeFreelancer = document.querySelector("#freelancer");
  let typeClient = document.querySelector("#client");

  /*verifica se o nome contém apenas letras*/
  if (isNaN(name)) {
    /*verifica se a password tem 8 ou mais caracteres*/
    if (password.length >= 8) {
      if (typeFreelancer.checked) {
        /*se o tipo de user selecionado for freelancer, é armazenada a conta como freelancer*/
        localStorage.setItem(
          storageSize + 1,
          JSON.stringify([name, email, password, "freelancer", []])
        );
      } else {
        /*senão (i.e cliente) é armazenada a conta como cliente*/
        localStorage.setItem(
          storageSize + 1,
          JSON.stringify([name, email, password, "client", []])
        );
      }

      /*mensagem de sucesso*/
      alert("Conta criada com sucesso!");

      /*limpar campos do form*/
      document.getElementById("signup-name").value = "";
      document.getElementById("signup-email").value = "";
      document.getElementById("signup-password").value = "";
      document.querySelector("#freelancer").checked = false;
      document.querySelector("#client").checked = false;

      window.open("../login.html", "_self"); /*abrir página de login*/
    } else alert("A password deve conter, pelo menos, 8 caracteres!");
  } else alert("Introduza um nome válido!");
}

//LOGIN
function logIn() {
  /*obter os valores dos campos do form*/
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;

  let accounts = listAccounts(); /*listar todoas as contas (através da função)*/

  let found = false;

  /*percorrer todo o array de contas*/
  for (let k = 0; k < accounts.length; k++) {
    /*se os dados corresponderem aos registados, é efetudado o login*/
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

  /*se a conta não for encontrada é apresentando um aviso*/
  if (!found) {
    alert("Os dados estão incorretos!");
  }

  /*limpar os campos do form*/
  document.getElementById("login-email").value = "";
  document.getElementById("login-password").value = "";
}

//LOGOUT
function logOut() {
  /*obter o login atual e removê-lo*/
  sessionStorage.removeItem("currentLogin");
  window.open("../index.html", "_self");
}

//ADICIONAR PROJETO A CONTA DE FREELANCER
function addProject(title, description) {
  let accounts = listAccounts(); /*listar contas*/

  let projects = [];

  /*percorrer o array de contas*/
  for (let k = 0; k < accounts.length; k++) {
    /*se a conta for igual à conta correspondente ao login atual, é adicionado o projeto a essa conta*/
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

//PASSWORD ESQUECIDA
function forgotPassword() {
  let accounts = listAccounts(); /*listar contas*/
  let projects = [];
  let user = prompt("Introduza o seu email"); /*leitura do email do user*/

  /*percorrer o array de contas*/
  for (let x = 0; x < accounts.length; x++) {
    /*se a conta for igual ao user, é lida a nova password e atualizada no array*/
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

//CRIAÇÃO DE OFERTAS DE TRABALHO POR CLIENTES
function createOffer() {
  /*obter o nome do cliente*/
  let title = document.getElementById("client-name").innerHTML;

  /*leitura da descrição do projeto*/
  let description = prompt("Introduza a descrição do projeto");

  let category;

  do {
    /*leitura da categoria do projeto*/
    category = prompt("Introduza a categoria do projeto");

    /*verificação de categoria válida*/
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
      /*se o user introduziir uma categoria inválida é apresentado um aviso*/
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

  let accounts = listAccounts();
  let offers = [];

  /*percorrer o array de contas*/
  for (let k = 0; k < accounts.length; k++) {
    /*se a conta for igual ao login atual, é adicionado a oferta a essa conta*/
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

  /*recarregamento da página*/
  location.reload();
}

//ABRIR POPUP
function openInfo(id) {
  document.getElementById(id).style.display = "block";
}

//FECHAR POPUP
function closeInfo(id) {
  document.getElementById(id).style.display = "none";
}

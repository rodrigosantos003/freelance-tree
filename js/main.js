//hide navbar on scroll
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

//login with google
function googleLogin() {
  window.open(
    "https://accounts.google.com/signin/v2/identifier?passive=1209600&continue=https%3A%2F%2Faccounts.google.com%2Fb%2F0%2FAddMailService&followup=https%3A%2F%2Faccounts.google.com%2Fb%2F0%2FAddMailService&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
  );
}

//login with facebook
function facebookLogin() {
  window.open("https://www.facebook.com/?ocid=topsitePT-PT");
}

//sign up
var freelancers = [];
var clients = [];

var storageSize = localStorage.length;

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
        JSON.stringify([name, email, password, "freelancer"])
      );
    } else {
      localStorage.setItem(
        storageSize + 1,
        JSON.stringify([name, email, password, "client"])
      );
    }

    alert("Conta criada com sucesso!");

    document.getElementById("signup-name").value = "";
    document.getElementById("signup-email").value = "";
    document.getElementById("signup-password").value = "";
    document.querySelector("#freelancer").checked = false;
    document.querySelector("#client").checked = false;
  } else alert("Os campos têm de estar preenchidos!");
}

function logIn() {
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;

  let accounts = [];

  let found = false;

  if (email != "" && password != "") {
    for (let i = 1; i <= storageSize; i++) {
      accounts.push(JSON.parse(localStorage.getItem(i)));
    }

    for (let k = 0; k < accounts.length; k++) {
      for (let x = 0; x < accounts[k].length; x++) {
        if (accounts[k][1] == email && accounts[k][2] == password) {
          found = true;
          if (accounts[k][3] == "freelancer") {
            window.open("../freelancer.html", "_self");
          } else {
            window.open("../client.html", "_self");
          }
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

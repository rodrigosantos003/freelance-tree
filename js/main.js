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

function signUp() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let typeFreelancer = document.querySelector("#freelancer");
  let typeClient = document.querySelector("#client");

  if (
    name != "" &&
    email != "" &&
    password != "" &&
    (typeFreelancer.checked || typeClient.checked)
  ) {
    if (typeFreelancer.checked) {
      freelancers.push([name, email, password]);

      localStorage.setItem("freelancerUsers", JSON.stringify(freelancers));
    } else {
      clients.push([name, email, password]);

      localStorage.setItem("clientUsers", JSON.stringify(clients));
    }

    alert("Conta criada com sucesso!");

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.querySelector("#freelancer").checked = false;
    document.querySelector("#client").checked = false;
  } else alert("Os campos têm de estar preenchidos!");
}

function logIn() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let freelanceUsers = JSON.parse(localStorage.getItem("freelancerUsers"));

  if (email != "" && password != "") {
    for (let i = 0; i < freelanceUsers.length; i++) {
      for (let x = 0; x < freelanceUsers[i].length; x++) {
        if (freelanceUsers[i][1] == email && freelanceUsers[i][2] == password) {
          window.open("../freelancer.html", "_self");
        }
      }
    }
  } else alert("Os campos têm de estar preenchidos!");
}

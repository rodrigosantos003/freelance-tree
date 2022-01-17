let accounts = [];
let projects = [];

for (let i = 1; i <= localStorage.length; i++) {
  accounts.push(JSON.parse(localStorage.getItem(i)));
}

for (let k = 0; k < accounts.length; k++) {
  if (accounts[k][1] == sessionStorage.getItem("currentLogin")) {
    for (let m = 0; m < accounts[k][4].length; m++) {
      projects.push(accounts[k][4][m]);
    }
  }
}

projects.forEach(([title, description]) => {
  let listItem = document.createElement("li");
  let projectTitle = document.createElement("h4");
  let projectDescription = document.createElement("p");
  projectTitle.innerText = title;
  projectDescription.innerText = description;
  listItem.appendChild(projectTitle);
  listItem.appendChild(projectDescription);
  document.getElementById("work-list").appendChild(listItem);
});

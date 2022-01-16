let accounts = [];
let proposals = [];

for (let i = 1; i <= localStorage.length; i++) {
  accounts.push(JSON.parse(localStorage.getItem(i)));
}

for (let k = 0; k < accounts.length; k++) {
  if (accounts[k][1] == sessionStorage.getItem("currentLogin")) {
    for (let m = 0; m < accounts[k][4].length; m++) {
      proposals.push(accounts[k][4][m]);
    }
  }
}

proposals.forEach(([title, description]) => {
  let listItem = document.createElement("li");
  let proposalTitle = document.createElement("h4");
  let proposalDescription = document.createElement("p");
  proposalTitle.innerText = title;
  proposalDescription.innerText = description;
  listItem.appendChild(proposalTitle);
  listItem.appendChild(proposalDescription);
  document.getElementById("work-list").appendChild(listItem);
});

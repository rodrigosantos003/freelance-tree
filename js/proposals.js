//proposals management
var proposals = [];

function addProposal(title, description) {
  proposals.push([title, description]);

  for (i = 0; i < proposals.length; i++) {
    console.log(proposals[i]);
  }
}

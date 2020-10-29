// Get peer id (hash) from URL.
const myPeerId = location.hash.slice(1);

//connect to peer server.
peer = new Peer(myPeerId, {
  host: "glajan.com",
  port: 8443,
  path: "/myapp",
  secure: true,
});

//print peer id on connection "open" event.
peer.on("open", (id) => {
  //console.log(id);
  const mypeerIdEl = document.querySelector(".my-peer-id");
  mypeerIdEl.innerText = id;
});

//log errorMessage to console
peer.on("error", (errorMessage) => {
  console.error(errorMessage);
});

// Event listener for click "refresh list".
const listpeersButtonEl = document.querySelector(".list-all-peers-button");
listpeersButtonEl.addEventListener("click", () => {
  //console.log("click");

  peer.listAllPeers((peers) => {
    const peerListEl = document.querySelector(".peers");
    const peersList = peers
      // Add filter for own peerId !!!
      .filter((peerId) => peerId !== peer._id)

      .map((peer) => {
        return `<li><button class= "connect-button peerId-${peer}" >${peer}</button></li>`;
      })
      .join("");
    peerListEl.innerHTML = peersList;

    //console.log("List of peers: " + peers);
  });
});

// main.js



const serverUrl = "https://r4h4symaponq.usemoralis.com:2053/server";
const appId = "Lyq1fkNR3hbHJv9XIkgDtCCjFU0CA1nPP4WTfY5r";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Hello World!" })
      console.log(user)
      console.log(user.get('ethAddress'))      
   } catch(error) {
     console.log(error)
   }
  }
  document.getElementById("btn-login").style.display = "none";
  document.getElementById("game").style.display = "block";
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

async function flip(side){
  await Moralis.enableWeb3()
  let amount = document.getElementById("amount").value;
  alert(side+ ' ' + amount);
  window.web3 = new Web3(Moralis.provider);
  let contractInstance = new web3.eth.Contract(window.abi,"0x228Bc6ba4fC3cDA34e41626F3707b46E08A5BECC")
  contractInstance.methods.flip(side == "heads"? 0:1).send({value: amount, from: ethereum.selectedAddress})
  .on('receipt', function(receipt){
    console.log(receipt);
    if(receipt.events.bet.returnValues.win){
      alert("YOU WON");

    }
    else{
      alert("YOU LOST")
    }
  })
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
document.getElementById("btn-heads").onclick = function(){flip("heads")};
document.getElementById("btn-tails").onclick = function(){flip("tails")};
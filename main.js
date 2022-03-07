// main.js



const serverUrl = "https://ejh3gnsrvzo6.usemoralis.com:2053/server";
const appId = "ggnKKGE0rdvgzLLPDvAl2CPLUx2esIeuPsyKNbQW";
const ethers = Moralis.web3Library
Moralis.start({ serverUrl, appId });
Moralis.authenticate();
/** Add from here down */
async function login() {
  let user = Moralis.User.current();
  console.log(user);
  if (!user) {
   try {
      user = await Moralis.enableWeb3({ provider: "metamask", signingMessage: "Hello World!" })
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
  let amount = document.getElementById("amount").value;
  alert(side+ ' ' + amount);
  let web3Provider = await Moralis.enableWeb3();
  
  console.log(web3.version);
  let contractInstance = new ethers.Contract("0xA744aF6bD7767738dDE56C18626CF8282eA5A035",window.abi,web3Provider.getSigner())
  // let contractInstance = new web3.eth.Contract(window.abi,"0x06eE0Cbd7821C89416Dc606D8440eb688f93b416")
  // let contractInstance = await ethereum.request({method: 'contract', params:[{jsonInterface:window.abi, address:"0x06eE0Cbd7821C89416Dc606D8440eb688f93b416" }] })
  contractInstance.on("bet", (user,  bet,  win, side)=>{
    console.log(user,bet,win,side)
  }
  );

  console.log(contractInstance);
  let results = contractInstance.flip(side == "heads"? 0:1,{value: amount, from: ethereum.selectedAddress, gasLimit: 99999})

  // .on('receipt', function(receipt){
  //   console.log(receipt);
  //   if(receipt.events.bet.returnValues.win){
  //     alert("YOU WON");

  //   }
  //   else{
  //     alert("YOU LOST")
  //   }
  // })
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
document.getElementById("btn-heads").onclick = function(){flip("heads")};
document.getElementById("btn-tails").onclick = function(){flip("tails")};
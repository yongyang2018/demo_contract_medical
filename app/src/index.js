import Web3 from "web3";
import metaCoinArtifact from "../../build/contracts/Medical.json";
// import globals from './globals';



const App = {
  web3: null,
  account: null, 
  meta: null,
  

  start: async function() {
    const { web3 } = this;
    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = metaCoinArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        metaCoinArtifact.abi,
        deployedNetwork.address,
      );
      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
      console.log(error);
    }
  },

  selectAll: async function(){
    const { selectAll } = this.meta.methods;
    var result = await selectAll().call();
    var flightInfo = result.flightInfo;
    var number = result.number;
    document.getElementById("aviation-flight").innerHTML = flightInfo;
    document.getElementById("aviation-number").innerHTML = number;
  },

  save: async function(name,time,info){
    const { web3 } = this;
    const { saveinfo } = this.meta.methods;
    await saveinfo(name,time,info).send({from:this.account, gas: 3141592},function(error, transactionHash){
      localStorage.setItem("medical_hash", transactionHash);
      localStorage.setItem("medical_hash_update", transactionHash);
      var url = "success.html?type=1";
      window.location.href=url; 
    });
  },

  address:async function(){
    await this.start();
    const { web3 } = this;
    document.getElementById("address_A").innerHTML = this.account;
    document.getElementById("address_B").innerHTML = this.account;
    document.getElementById("address_C").innerHTML = this.account;
    document.getElementById("address_D").innerHTML = this.account;
  },

  update_A: async function(status) {
    const { web3 } = this;
    const { update_A } = this.meta.methods;
    await  update_A(status).send({from:this.account, gas: 3141592},function(error, transactionHash){
      var url = "success.html?type=2";
      window.location.href=url;
      localStorage.setItem("medical_hash_update", transactionHash);
    });
    
  },

  update_B: async function(status) {
    const { web3 } = this;
    const { update_B } = this.meta.methods;
    await  update_B(status).send({from:this.account, gas: 3141592},function(error, transactionHash){
      var url = "success.html?type=2";
      window.location.href=url;
      localStorage.setItem("medical_hash_update", transactionHash);
    });
    
  },

  update_C: async function(status) {
    const { web3 } = this;
    const { update_C } = this.meta.methods;
    await  update_C(status).send({from:this.account, gas: 3141592},function(error, transactionHash){
      var url = "success.html?type=2";
      window.location.href=url;
      localStorage.setItem("medical_hash_update", transactionHash);
    });
    
  },
  to_patient: async function() {
    const { selectAll } = this.meta.methods;
    var result = await selectAll().call();
    if(result.name == "" || result.name == null){
      alert("暂无信息！");
      return;
    }else{
      var url = "user.html";
      window.location.href=url; 
    }
  },
  to_chain: async function() {
    const { selectAll } = this.meta.methods;
    var result = await selectAll().call();
    if(result.name == "" || result.name == null){
      var url = "chain.html";
      window.location.href=url; 
    }else{
      alert("病人信息已完善！");
      return;
    }
  },
  search: async function(type,hash) {
    const { selectAll } = this.meta.methods;
    var result = await selectAll().call();
    if(type == 1){
      if(result.status_A == 1){
        alert("暂无信息");
        return;
      }
      if(localStorage.getItem("medical_hash") != hash){
          alert("暂无信息");
          return;
      }
      var url = "select-info.html";
      window.location.href=url; 
    }else if(type == 2){
      if(result.status_B == 1){
        alert("暂无信息");
        return;
      }
      if(localStorage.getItem("medical_hash") != hash){
        alert("暂无信息");
        return;
      }
      var url = "select-info.html";
      window.location.href=url; 
    }else if(type == 3){
      if(result.status_C == 1){
        alert("暂无信息");
        return;
      }
      if(localStorage.getItem("medical_hash") != hash){
        alert("暂无信息");
        return;
      }
      var url = "select-info.html";
      window.location.href=url; 
    }
  },
  select_info: async function() {
    await this.start();
    const { web3 } = this;
    const { selectAll } = this.meta.methods;
    var result = await selectAll().call();
    document.getElementById("name").innerHTML = result.name;
    document.getElementById("tx_hash").innerHTML = localStorage.getItem("medical_hash");
    document.getElementById("time").innerHTML = result.time;
    document.getElementById("info").innerHTML = result.info;
    if(localStorage.getItem("medical_hash") != null){
      web3.eth.getTransaction(localStorage.getItem("medical_hash"),function(error, transaction){
        document.getElementById("block_height").innerHTML = transaction.blockNumber;
        document.getElementById("block_hash").innerHTML = transaction.blockHash;
      });
    }
  },
  user_info: async function() {
    await this.start();
    const { web3 } = this;
    const { selectAll } = this.meta.methods;
    var result = await selectAll().call();
    if(result.status_A == 1){
      $("#A_empower").show();
      $("#A_info").html("未授权");
    }else if(result.status_A == 2){
      $("#A_cancel").show();
      $("#A_info").html("已授权");
    }
    if(result.status_B == 1){
      $("#B_empower").show();
      $("#B_info").html("未授权");
    }else if(result.status_B == 2){
      $("#B_cancel").show();
      $("#B_info").html("已授权");
    }
    if(result.status_C == 1){
      $("#C_empower").show();
      $("#C_info").html("未授权");
    }else if(result.status_C == 2){
      $("#C_cancel").show();
      $("#C_info").html("已授权");
    }
    document.getElementById("A_tx_hash").innerHTML = localStorage.getItem("medical_hash");
    document.getElementById("B_tx_hash").innerHTML = localStorage.getItem("medical_hash");
    document.getElementById("C_tx_hash").innerHTML = localStorage.getItem("medical_hash");
    if(localStorage.getItem("medical_hash") != null){
      web3.eth.getTransaction(localStorage.getItem("medical_hash_update"),function(error, transaction){
        document.getElementById("A_height").innerHTML = transaction.blockNumber;
        document.getElementById("A_block_hash").innerHTML = transaction.blockHash;
        document.getElementById("B_height").innerHTML = transaction.blockNumber;
        document.getElementById("B_block_hash").innerHTML = transaction.blockHash;
        document.getElementById("C_height").innerHTML = transaction.blockNumber;
        document.getElementById("C_block_hash").innerHTML = transaction.blockHash;
      });
    }
  },
  success_info: async function(type) {
    if(type == 1){
      $("#hash").html(localStorage.getItem("medical_hash"));
    }else if(type == 2){
      $("#hash").html(localStorage.getItem("medical_hash_update"));
    }
  },
  
  remake: async function() {
    const { deleteinfo } = this.meta.methods;
    await  deleteinfo().send({from:this.account, gas: 3141592},function(error, transactionHash){
      localStorage.setItem("medical_hash", null);
      localStorage.setItem("medical_hash_update", null);
      alert("成功");
    });
  }
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://192.168.1.167:7545"),
    );
  }
  App.start();
});

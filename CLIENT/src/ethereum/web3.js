import Web3 from "web3";
let web3;

      // Modern dapp browsers...
      if (window.ethereum) {
         web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
           window.ethereum.enable();
          // Acccounts now exposed
        } catch (error) {

        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
         web3 = window.web3;
        console.log("Injected web3 detected.");

      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:7545"
        );
         web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");

      }

export default web3

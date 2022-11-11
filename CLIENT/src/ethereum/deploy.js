const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledOrganChain = require('./build/OrganChain.json')

const provider = new  HDWalletProvider(
    'soul adapt just desk fog impulse issue dress make carry cash history',
    // '#PASTE YOUR ACCOUNT MNEMONIC SEED WORDS HERE#',
    'HTTP://127.0.0.1:7545'
);

const web3 = new Web3(provider);

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy contract from account : ' , accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledOrganChain.interface))
    .deploy({ data : compiledOrganChain.bytecode })
    .send({ from : accounts[0] , gas : '10000000'});

    console.log('Contract deployed at address :',result.options.address);
};

deploy();


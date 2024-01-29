const bitcoin = require('bitcoinjs-lib');
const ECPairFactory = require('ecpair').default;
const ecc = require('tiny-secp256k1');
const fs = require('fs');

const ECPair = ECPairFactory(ecc);
const network = bitcoin.networks.testnet; // Otherwise, bitcoin = mainnet and regnet = local
// console.log( bitcoin);

const outputNumber = 0;
const txid = '6da3ce97ce5210657e0b4eda2989f58b0b2bd95d78d59b625e288baf7acfa0ce';
const amount = 0.00077801;
const txHash = Buffer.from(txid, "hex")


const txb = new bitcoin.Transaction(network);
txb.network = bitcoin.networks.testnet;
txb.addInput(txHash, outputNumber);
const destinationAddress = 'mv4rnyY3Su5gjcDNzbMLKBQkBicCtHUtFB'
const minerFee = 1000;
const outputAmount = amount*1e8 - minerFee;
// Convert destination address to Buffer
const destinationBuffer = bitcoin.address.toOutputScript(destinationAddress, bitcoin.networks.testnet);
txb.addOutput(destinationBuffer, outputAmount);
const keypair = 'cVhFvkoYso8hPU6NJwsK68RGDB2wAkujxaGu3PBUUmC1TLDskwNu'
console.log(423);
txb.sign(0, keypair);
txb.build().toHex();

// async function createTransaction() {
//     try {
//         const outputNumber = 0;
//         const txid = '6da3ce97ce5210657e0b4eda2989f58b0b2bd95d78d59b625e288baf7acfa0ce';
//         const amount = 0.00077801;
//         const txb = new bitcoin.Transaction();
//         txb.network = bitcoin.networks.testnet;
//         txb.addInput(txid, outputNumber);
//         const destinationAddress = 'mv4rnyY3Su5gjcDNzbMLKBQkBicCtHUtFB'
//         const minerFee = 1000;
//         const outputAmount = amount*1e8 - minerFee;
//         txb.addOutput(destinationAddress, outputAmount);
//         txb.sign(0, keypair);
//         txb.build().toHex();
//     } catch (error) {
//         console.log(error)
//     }
// }

// createTransaction();
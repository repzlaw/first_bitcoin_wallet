const bitcoin = require('bitcoinjs-lib');

// Define network (mainnet or testnet)
const network = bitcoin.networks.testnet;

// Example input data
const utxoTxid = '6da3ce97ce5210657e0b4eda2989f58b0b2bd95d78d59b625e288baf7acfa0ce';
const utxoIndex = 0;
const utxoAmount = 0.001; // Amount in BTC
const utxoScript = Buffer.from('...'); // Script for the UTXO (replace with actual script)

// Example output data
const recipientAddress = 'tb1qzqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqfq7v9wr';
const outputAmount = 0.0009; // Amount in BTC

// Example private key in WIF format
const privateKeyWIF = 'yourPrivateWIF';

// Create key pair from private key
const keyPair = bitcoin.ECPair.fromWIF(privateKeyWIF, network);

// Create PSBT
const psbt = new bitcoin.Psbt({ network });

// Add input with UTXO information
psbt.addInput({
  hash: Buffer.from(utxoTxid, 'hex'),
  index: utxoIndex,
  sequence: 0xffffffff,
  witnessUtxo: {
    script: utxoScript,
    value: Math.round(utxoAmount * 1e8), // Convert to satoshis
  },
});

// Add output with recipient address and amount
psbt.addOutput({
  address: recipientAddress,
  value: Math.round(outputAmount * 1e8), // Convert to satoshis
});

// Sign the input with the private key
psbt.signInput(0, keyPair);

// Finalize the PSBT
psbt.finalizeAllInputs();

// Extract the fully signed transaction hex
const fullySignedTxHex = psbt.extractTransaction().toHex();

console.log('Fully Signed Transaction Hex:', fullySignedTxHex);

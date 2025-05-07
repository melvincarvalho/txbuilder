#!/usr/bin/env node

/**
 * Bitcoin Transaction Builder using Taproot
 * 
 * This script creates a Bitcoin transaction with one input and multiple outputs.
 * It signs the transaction with a provided private key and outputs the transaction hex.
 */

import { Address, Signer, Tx } from '@cmdcode/tapscript'

// Parse command line arguments
const args = process.argv.slice(2)

// Private/public key
const seckey = args[0] || '018f28657fdd6a3558c83a2f0845f1d6a05b841156718bb84551a38ac2ea0ee5'
const pubkey = args[1] || Signer.taproot.getPublicKey(seckey)

// Input transaction details
const txid = args[2] || 'e1934c36263b83ab2b36c6595ff6751421a11f45fdacb3a9cf7ba746140ed850'
const vout = args[3] !== undefined ? parseInt(args[3]) : 0
const amount = parseInt(args[4]) || 97860000

// Fee (in satoshis)
const fee = 20000

// Calculate number of outputs
const outputCount = (args.length - 5) / 2

// Generate taproot address from public key
const address = Address.p2tr.encode(pubkey, 'mainnet')

// Prepare output data
const outputs = []
const defaultOutputAmount = 1000000 // 1M satoshis default

for (let i = 0; i < outputCount; i++) {
  const outputAddress = args[5 + (i * 2)] || pubkey
  const outputAmount = parseInt(args[6 + (i * 2)]) || defaultOutputAmount

  outputs.push({
    value: outputAmount,
    scriptPubKey: ['OP_1', outputAddress]
  })
}

// Create transaction
const txdata = Tx.create({
  vin: [{
    txid: txid,
    vout: vout,
    prevout: {
      value: amount,
      scriptPubKey: ['OP_1', pubkey]
    },
  }],
  vout: outputs
})

// Debug output (to stderr)
console.error('Transaction Data:', JSON.stringify(txdata, null, 2))

// Sign the transaction (input index 0)
const signature = Signer.taproot.sign(seckey, txdata, 0)
txdata.vin[0].witness = [signature]

// Verify the signature
await Signer.taproot.verify(txdata, 0, { throws: true })

// Output results
console.error('Your address:', address)
console.error('Your txhex:')
console.log(Tx.encode(txdata).hex)

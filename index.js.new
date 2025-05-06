#!/usr/bin/env node

import { Address, Signer, Tx } from '@cmdcode/tapscript'

// Sample secret / public key pair.
const seckey = process.argv[2] || '018f28657fdd6a3558c83a2f0845f1d6a05b841156718bb84551a38ac2ea0ee5'
const pubkey = process.argv[3] || '5f49bb8ae1649065012ba6aa02fb3ad86af35ac6fa5c9f99704944877abd8517'

// For key-spends, we need to tweak both the secret key and public key.
// const [tseckey] = Tap.getSecKey(seckey)
// const [tpubkey] = Tap.getPubKey(pubkey)

// fee
const fee = 20000

var outlen = (process.argv.length - 7) / 2

// txo
const txid = process.argv[4] || 'e1934c36263b83ab2b36c6595ff6751421a11f45fdacb3a9cf7ba746140ed850'
const vout = process.argv[5] !== undefined ? parseInt(process.argv[5]) : 0
const amount = parseInt(process.argv[6]) || 97860000

// Our taproot address is the encoded version of our public tapkey.
// const address = Address.p2tr.encode(tpubkey, 'mainnet')
var outAddress = []
var outAmount = []
const address = Address.p2tr.encode(pubkey, 'mainnet')

const size = 1000000
var voutobj = []

for (let i = 0; i < outlen; i++) {
  outAddress[i] = process.argv[7 + (i * 2)] || '5f49bb8ae1649065012ba6aa02fb3ad86af35ac6fa5c9f99704944877abd8517'
  outAmount[i] = parseInt(process.argv[8 + (i * 2)]) || size
  voutobj.push({
    // We are locking up 99_000 sats (minus 1000 sats for fees.)
    value: outAmount[i],
    // We are locking up funds to this address.
    scriptPubKey: ['OP_1', outAddress[i]]
  })
}

const txdata = Tx.create({
  vin: [{
    // The txid of your funding transaction.
    txid: txid,
    // The index of the output you are spending.
    // vout: parseInt(process.argv[5]) || 31
    vout: vout,
    // For Taproot, we need to specify this data when signing.
    prevout: {
      // The value of the output we are spending.
      value: amount,
      // This is the script that our taproot address decodes into.
      scriptPubKey: ['OP_1', pubkey]
    },
  }],
  vout: voutobj
})

console.error(JSON.stringify(txdata, null, 2))

// For this example, we are signing for input 0.

// Provide your tweaked secret key with the transaction, 
// plus the index # of the input you are signing for.
const sig = Signer.taproot.sign(seckey, txdata, 0)

// Add your signature to the witness data for that input.
txdata.vin[0].witness = [sig]

// For verification, provided your 
await Signer.taproot.verify(txdata, 0, { throws: true })

console.error('Your address:', address)
console.error('Your txhex:')

// tx to stdout
console.log(Tx.encode(txdata).hex)

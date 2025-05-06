<div align="center">  
  <h1>txbuilder</h1>
</div>

<div align="center">  
<i>txbuilder</i>
</div>

---

<div align="center">
<h4>Documentation</h4>
</div>

---

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/melvincarvalho/txbuilder/blob/gh-pages/LICENSE)
[![npm](https://img.shields.io/npm/v/txbuilder)](https://npmjs.com/package/txbuilder)
[![npm](https://img.shields.io/npm/dw/txbuilder.svg)](https://npmjs.com/package/txbuilder)
[![Github Stars](https://img.shields.io/github/stars/melvincarvalho/txbuilder.svg)](https://github.com/melvincarvalho/txbuilder/)

## Introduction

txbuilder is a tool for building Bitcoin transactions using the tapscript library.

## Installation

```bash
git clone https://github.com/melvincarvalho/txbuilder.git
cd txbuilder
npm install
chmod +x txbuilder.sh
```

## Usage

### Using the wrapper script (recommended)

The simplest way to run txbuilder is to use the wrapper script:

```bash
./txbuilder.sh [seckey] [pubkey] [txid] [vout] [amount] [outAddress1] [outAmount1] [outAddress2] [outAmount2] ...
```

### Direct Node.js execution

If you prefer to run it directly with Node.js, you'll need to use the `--experimental-global-webcrypto` flag:

```bash
node --experimental-global-webcrypto index.js [seckey] [pubkey] [txid] [vout] [amount] [outAddress1] [outAmount1] [outAddress2] [outAmount2] ...
```

## Requirements

- Node.js v18+
- The `@cmdcode/tapscript` package

## License

- MIT

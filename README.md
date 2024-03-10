## React Native Boilerplate for bitcoinjs-lib & ethers

Jumpstart your React Native crypto app development with this boilerplate that simplifies the configuration setup for Bitcoinjs-lib and Etherjs.

## Getting Started

Follow these simple steps to use the React Native CryptoConfig-Boilerplate:

- Clone the repository: `https://github.com/durgeshahire07/ReactNative-bitcoinjs-lib-ethers`
- Install dependencies:

```
npm install

```
#### Patch `react-native-randombytes` lib:
Navigate to `node_modules/react-native-randombytes/index.js`

- Replace the below `init()` function code:
```
function init () {
  if (RNRandomBytes.seed) {
    let seedBuffer = toBuffer(RNRandomBytes.seed)
    addEntropy(seedBuffer)
  } else {
    seedSJCL()
  }
}
```
- With the below code snippet:


```javascript
function init() {
  if (RNRandomBytes) {
    if (RNRandomBytes.seed) {
      let seedBuffer = toBuffer(RNRandomBytes.seed)
      addEntropy(seedBuffer)
    } else {
      seedSJCL()
    }
  }
}
```
Follow the link to have better clarity on patching the lib: [Here](https://github.com/durgeshahire07/ReactNative-bitcoinjs-lib-ethers/blob/master/patches/react-native-randombytes%2B3.6.1.patch) 

### Happy Coding 🚀

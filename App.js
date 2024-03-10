import React from "react";
import { View, Text } from "react-native";
import './shim'
import ECPairFactory from 'ecpair';
import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs'
import * as Bitcoin from 'bitcoinjs-lib';
import { ethers } from 'ethers';

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 30 }}>
      <Text>Wohoo!!</Text>
      <Text style={{ textAlign: 'center' }}>You have successfully added bitcoinjs-lib, ethers and other polyfills into your react native app</Text>
    </View>
  );
};


export default App;
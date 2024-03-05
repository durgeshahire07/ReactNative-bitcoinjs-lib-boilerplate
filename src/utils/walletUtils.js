import { ethers } from 'ethers';
import { isPolygonPrivateKeyValid, isValidBitcoinPrivateKey } from './stringValidation';
import { POLYGON, BITCOIN, POLYGON_TESTNET_CODE, ALCHEMY_API_KEY, POLYGON_STORAGE_KEY, BITCOIN_STORAGE_KEY, CRYPTO_API_KEY } from '../constants/commonConstants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ECPairFactory from 'ecpair';
import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs'
import * as Bitcoin from 'bitcoinjs-lib';
import axios from 'axios';

const Erc20Abi = require('../assets/jsonData/erc20.json')

export const importPolygonWallet = async (walletStore, privateKey) => {
    if (isPolygonPrivateKeyValid(privateKey)) {
        try {
            const provider = new ethers.AlchemyProvider(POLYGON_TESTNET_CODE, ALCHEMY_API_KEY);
            // const provider = new ethers.InfuraProvider(POLYGON_TESTNET_CODE, "a18829b7a1a04a9082c84fef029a47b0");
            const wallet = new ethers.Wallet(privateKey, provider);
            const address = await wallet.getAddress();
            const bal = await provider.getBalance(address);
            const balance = ethers.formatEther(bal)

            //updating store values
            walletStore.privateKey = privateKey;
            walletStore.activeWallet = POLYGON;
            walletStore.address = address;
            walletStore.balance = balance;

            //storing key in storage
            await AsyncStorage.setItem(POLYGON_STORAGE_KEY, privateKey);

            return true;
        }
        catch (err) {
            console.log("error importing polygon wallet", err)
            return false;
        }
    }
    else {
        return false;
    }
}

export const importBitcoinWallet = async (walletStore, privateKey) => {
    try {
        if (isValidBitcoinPrivateKey(privateKey)) {
            const NETWORK = Bitcoin.networks.testnet;

            const ECPair = ECPairFactory(ecc);

            const keyPair = ECPair.fromWIF(privateKey, NETWORK)

            const { address } = Bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: NETWORK });

            const publicKey = keyPair.publicKey.toString('hex');
            const privateKeyWif = keyPair.toWIF();

            // const getBalance = await axios.get(
            //     `https://rest.cryptoapis.io/blockchain-data/bitcoin/testnet/addresses/${address}/balance?context="getWalletBalance"`,
            //     {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'X-API-Key': CRYPTO_API_KEY,
            //         },
            //     }
            // );

            // let balanceInBTC = getBalance.data.data.item.confirmedBalance.amount;
            const result = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full?limit=50`)
            let balanceInSatoshis = result.data.final_balance;
            const balanceInBTC = balanceInSatoshis / 100000000;
            //updating store values
            walletStore.privateKey = privateKey;
            walletStore.activeWallet = BITCOIN;
            walletStore.address = address;
            walletStore.balance = balanceInBTC

            //storing key in storage
            await AsyncStorage.setItem(BITCOIN_STORAGE_KEY, privateKey);


            return true;
        }
        else {
            return false;
        }


    } catch (error) {
        console.error('error importing bitcoin wallet:', error);
    }
}

export const sendMaticToReciever = async (walletStore, recieverAddress, amount) => {
    try {
        const provider = new ethers.AlchemyProvider(POLYGON_TESTNET_CODE, ALCHEMY_API_KEY);

        // const wallet = new ethers.Wallet(walletStore.privateKey, provider);

        // const tokenContract = '0x6ab707Aca953eDAeFBc4fD23bA73294241490620'
        // const contract = new ethers.Contract(tokenContract, Erc20Abi, wallet);
        const signer = new ethers.Wallet(walletStore.privateKey, provider)

        const tx = await signer.sendTransaction({
            to: recieverAddress,
            value: ethers.parseUnits(amount, 'ether'),
        });

        // Wait for the transaction to be confirmed
        const receipt = await tx.wait()

        if (receipt.status === 1) {
            return {
                status: true,
                txHash: tx.hash
            }
        } else {
            console.log("transaction unsuccessfull", tx.hash)
            return {
                status: false,
                txHash: tx.hash
            }
        }
    } catch (err) {
        if (err.message.includes('insufficient funds')) {
            return {
                status: false,
                errorMessage: 'Insufficient funds'
            };
        }
        return {
            status: false,
            errorMessage: 'An error occurred'
        };
    }
}


export const sendBitcoinToReciever = async (
    walletStore,
    recieverAddress,
    amountToSend
) => {
    let ra = '2N8yzWEDwhvqh5cXR1UyWWwN92rgndNFci8'
    try {
        const NETWORK = Bitcoin.networks.testnet;

        const ECPair = ECPairFactory(ecc);

        const keyPair = ECPair.fromWIF(walletStore.privateKey, NETWORK)

        const { address } = Bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: NETWORK });
        // const satoshiToSend = amountToSend * 100000000;
        // 10000 sat = 0.0001 btc
        const satoshiToSend = 10000 * 100000000;

        let fee = 0;
        let inputCount = 0;
        //going to use 2 as the output count because we'll only send the bitcoin to 2 addresses the receiver's address and our change address.
        let outputCount = 2


        const publicKey = keyPair.publicKey.toString('hex');
        const privateKeyWif = keyPair.toWIF();

        //getting unsent transactions
        // const unspentTxData = await axios.get(
        //     `https://rest.cryptoapis.io/blockchain-data/bitcoin/testnet/addresses/${address}/unspent-outputs?context=getUnsentTx&limit=50&offset=0`,
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'X-API-Key': CRYPTO_API_KEY,
        //         },
        //     }
        // );
        const result = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full?limit=50`)
        let totalAmountAvailable = 0;

        const utxos = result.data.txs
        console.log("utox", utxos)
        inputs = []
        for (const element of utxos) {
            let utxo = {};
            utxo.satoshis = element.total;
            utxo.script = element.inputs[0].script_type;
            utxo.address = address;
            // utxo.txId = element.txid;
            utxo.outputIndex = element.block_index;
            inputCount += 1;
            inputs.push(utxo);
        }
        console.log('Inputs:', inputs);
        console.log('Total Amount Available:', walletStore.balance);
        console.log('Input Count:', inputCount);


        // //initiating new transaction - 
        // const transaction = Bitcoin.Transaction();

        // const inputs = [];

        // for (const element of utxos) {
        //     let utxo = {};
        //     utxo.satoshis = Math.floor(Number(element.amount) * 100000000);
        //     // utxo.script = element.script_hex;
        //     utxo.address = address;
        //     utxo.txId = element.transactionId;
        //     utxo.outputIndex = element.index;
        //     totalAmountAvailable += utxo.satoshis;
        //     inputCount += 1;
        //     inputs.push(utxo);
        // }

        // console.log('Inputs:', inputs);
        // console.log('Total Amount Available:', totalAmountAvailable);
        // console.log('Input Count:', inputCount);

        // transaction.from(inputs)

        // //formula to calculate transaction size
        // const transactionSize = inputCount * 180 + outputCount * 34 + 10 - inputCount;
        // fee = transactionSize * 20

        // if (totalAmountAvailable - satoshiToSend - fee < 0) {
        //     throw new Error("Balance is too low for this transaction");
        // }
        // console.log("fee ==>", fee)
        // var txb = new Bitcoin.Transaction()
        // txb.addInput(latestTx, 1)
        // //0.00001
        // txb.addOutput(ra, 1000)



        return {
            status: true,
            errorMessage: 'Testing'
        };
    }
    catch (err) {
        console.log("error occured in sending btc", err)
        if (err.message.includes('insufficient funds')) {
            return {
                status: false,
                errorMessage: 'Insufficient funds'
            };
        }
        return {
            status: false,
            errorMessage: 'An error occurred'
        };
    }
}

export const getPolygonTransactionDetails = async (walletStore, transactionHash) => {
    try {
        const provider = new ethers.AlchemyProvider(POLYGON_TESTNET_CODE, ALCHEMY_API_KEY);
        const txReceipt = await provider.getTransaction(transactionHash)
        if (txReceipt) {
            return {
                status: true,
                to: txReceipt.to,
                from: txReceipt.from,
                gasFee: `${ethers.formatEther(txReceipt.gasPrice)} MATIC`,
                amount: `${ethers.formatEther(txReceipt.value)} MATIC`
            }
        }
        return {
            status: false,
            errorMessage: "Something went wrong"
        };
    } catch (err) {
        console.log("err in getting transaction details", err)
        return {
            status: false,
            errorMessage: "Something went wrong"
        };
    }
}
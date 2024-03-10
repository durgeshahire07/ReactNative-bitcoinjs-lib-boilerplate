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
            const result = await axios.get(`https://mempool.space/testnet/api/address/${address}`)
            let balanceInSatoshis = result.data.chain_stats.funded_txo_sum;
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
        if (error.response && error.response.status === 429) {
            return {
                status: false,
                errorMessage: 'Insufficient funds'
            };
        }
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
    let ra = 'tb1qznkwgpapfgmwtuczyqzsgcjvye3zju5e22j4dh'
    try {
        const NETWORK = Bitcoin.networks.testnet;

        const ECPair = ECPairFactory(ecc);

        const keyPair = ECPair.fromWIF(walletStore.privateKey, NETWORK)

        const { address } = Bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: NETWORK });
        // const satoshiToSend = amountToSend * 100000000;
        // 10000 sat = 0.0001 btc
        let amount = 0.0001

        const publicKey = keyPair.publicKey.toString('hex');
        const privateKeyWif = keyPair.toWIF();

        const unspentTxData = [
            {
                "txid": "9bdea004e9b8de3678faacdcba0959b730387b9c19d9c25a257c762d04a19d12",
                "vout": 0,
                "status":
                {
                    "confirmed": true,
                    "block_height": 2580650,
                    "block_hash": "0000000000000009ebaf31b57b74c6a24ee7cb5157a6e222c20afdb106e46aac",
                    "block_time": 1709665396
                },
                "value": 20000
            },
            {
                "txid": "4f555e95727d6cd4d668fc16f2914eecb2bad18011d00048d8b990bc6e20c26c",
                "vout": 1,
                "status":
                {
                    "confirmed": true,
                    "block_height": 2580660,
                    "block_hash": "0000000000012e998be3682993253c3767575b597e0912544fafcd5934c8b267",
                    "block_time": 1709672234
                },
                "value": 10000
            }
        ]

        let totalAmountAvailable = 0;
        const final_balance = unspentTxData.final_balance
        
        let fee = 26456;
        let inputCount = 0;
        let outputCount = 2;
        const satoshiToSend = amount * 100000000;
        
        let whatIsLeft = final_balance - fee - satoshiToSend;

        // Reverse the array
        const reversedTxData = unspentTxData.reverse();
        // Get the latest transaction hash
        let latestTxHash = reversedTxData[0].txid;

        

        const psbt = new Bitcoin.Psbt(NETWORK);

        psbt.addInput({
            hash: "4f555e95727d6cd4d668fc16f2914eecb2bad18011d00048d8b990bc6e20c26c",
            index: 1,
            witnessUtxo: reversedTxData[0],
            // redeemScript: Buffer.from("???", 'hex'),
        });

        psbt.addOutput({
            address: ra,
            value: satoshiToSend,
        });

        psbt.signInput(0, keyPair);
        psbt.finalizeInput(0);
        const tx = psbt.extractTransaction();
        console.log(tx.toHex());

        // console.log("latext hx", latestTxHash)

        // const inputTransactionHash = Buffer.from(reversedTxData[0].txid, 'hex');
        // const inputTransactionIndex = reversedTxData[0].vout;

        // transaction.addInput(inputTransactionHash, inputTransactionIndex);

        // const { output } = Bitcoin.payments.p2wpkh({ address: ra, network: NETWORK });
        // const outputValue = satoshiToSend; // Set the value in satoshis you want to send
        // transaction.addOutput(output, outputValue);
        // // transaction.addOutput(address, whatIsLeft);
        // transaction.sign(0, keyPair);

        // let body = txb.build().toHex();

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
import { ethers } from 'ethers';
import { isPolygonPrivateKeyValid } from './stringValidation';
import { POLYGON, BITCOIN, POLYGON_TESTNET_CODE, ALCHEMY_API_KEY, POLYGON_STORAGE_KEY } from '../constants/commonConstants';
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const sendUSDT = async (walletStore, recieverAddress, amount) => {
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

export const importBitcoinWallet = async (walletStore, privateKey) => {
    try {
        // const network = BitcoinJS.networks.testnet; // Use testnet network
        // const keyPair = BitcoinJS.ECPair.fromWIF(privateKey, network);
        // const address = keyPair.getAddress();p 
    } catch (error) {
        console.error('error importing bitcoin wallet:', error);
    }
}

export const sendBitcoin = async (walletStore, recieverAddress, amount) => {
    try {

    }
    catch (err) {
        console.log("error in sending bitcoin", err)
    }
}

export const getPolygonTransactionDetails = async (walletStore, transactionHash) => {
    try {
        console.log("inside get details")
        const provider = new ethers.AlchemyProvider(POLYGON_TESTNET_CODE, ALCHEMY_API_KEY);
        const txReceipt = await provider.getTransaction(transactionHash)
        console.log("tx reciept===>", txReceipt)
        if (txReceipt) {
            return {
                status: true,
                to: txReceipt.to,
                from: txReceipt.from,
                gasFee:  `${ethers.formatEther(txReceipt.gasPrice)} MATIC`,
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
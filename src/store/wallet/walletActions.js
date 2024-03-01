import { action } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosCallAdvanced } from "../../api/main";
import apiEndpoints from "../../api/endpoints"
import { BITCOIN, POLYGON } from "../../constants/commonConstants";
import { Wallet } from 'ethers';
import { isPolygonPrivateKeyValid } from "../../utils/stringValidation";

export const isWalletActive = action(async (walletStore, walletType, loading) => {
    try {
        const pvtKey = await AsyncStorage.getItem(`${walletType}PrivateKey`);
        // await AsyncStorage.clear();
        console.log("wallet type===>", walletType, "pvt key====>", pvtKey)
        loading(false)
        if (pvtKey) {
            return true;
        }
        else {
            return false;
        }

        // if(walletStore.privateKey){
        //     return true;
        // }
        // else{
        //     return false;
        // }
    } catch (error) {
        console.error("Error fetching crypto prices:", error);
        return false;
    }
});

export const importWallet = action(async ({ walletStore, walletType, privateKey }) => {
    console.log("pvt key===>", privateKey)
    let walletAddress = ''
    if (isPolygonPrivateKeyValid(privateKey)) {
        const wallet = new Wallet(privateKey);
        walletAddress = wallet.address;
        walletStore.privateKey = privateKey;
        walletStore.activeWallet = walletType;
        await AsyncStorage.setItem(`${walletType}PrivateKey`, privateKey);
        return true;
    }
    else {
        return false;
    }

    // Save private key to AsyncStorage
    // AsyncStorage.setItem(`${walletType}PrivateKey`, privateKey);

});

export const switchWallet = action(async (walletStore, network, loading) => {
    loading(true);
    console.log("inside switch wallet")

    walletStore.activeWallet = network;
    walletStore.privateKey = null;
    walletStore.address = "";
    walletStore.balance = 0;
    walletStore.transactionHistory = [];

    // const storedPvtKey = await AsyncStorage.getItem(`${network}PrivateKey`);
    // walletStore.activeWallet = network;

    // if (!storedPvtKey) {
    //     console.log("SW: no pvt key")
    //     // Reset the state before switching the wallet
    //     walletStore.privateKey = null;
    //     walletStore.address = "";
    //     walletStore.balance = 0;
    //     walletStore.transactionHistory = [];
    // }
    // else {
    //     console.log("SW: pvt key exit")
    //     walletStore.balance = 100.00;
    //     walletStore.privateKey = storedPvtKey;
    //     const wallet = new Wallet(storedPvtKey);
    //     if (wallet.address) {
    //         walletStore.address = wallet.address
    //     }
    // }
});


export const sendTransaction = action(async (walletStore, receiverAddress, amount) => {
    try {
        // Implement logic to send transaction using appropriate library (bitcoinjs-library or ethers.js)
        // Update transaction history
    } catch (error) {
        console.error(error);
    }
});

export const loadWalletFromLocalStorage = action(async (walletStore) => {
    const privateKey = await AsyncStorage.getItem(`${walletStore.activeWallet}PrivateKey`);
    if (privateKey) {
        importWallet(walletStore, privateKey, walletStore.activeWallet);
    } else {
        importWallet(walletStore, null, walletStore.activeWallet);
    }
});

export const fetchWalletBalance = action(async (walletStore, loading) => {

});


import { action } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosCallAdvanced } from "../../api/main";
import apiEndpoints from "../../api/endpoints"
import { BITCOIN, POLYGON } from "../../constants/commonConstants";
import { importPolygonWallet, importBitcoinWallet } from "../../utils/walletImport";

export const isWalletActive = action(async (walletStore, walletType) => {
    try {
        walletStore.activeWallet = walletType
        const pvtKey = await AsyncStorage.getItem(`${walletType}PrivateKey`);
        if (pvtKey) {
            return {
                status: true,
                key: pvtKey
            };
        }
        else {
            return {
                status: false
            };
        }
    } catch (error) {
        console.error("error in getting wallet status:", error);
        return false;
    }
});

export const importWallet = action(async ({ walletStore, walletType, privateKey }) => {
    switch (walletType) {
        case POLYGON:
            return importPolygonWallet(walletStore, privateKey);
        case BITCOIN:
            return importBitcoinWallet(walletStore, privateKey);
        default:
            return false;
    }
});

export const switchWallet = action(async (walletStore, network, loading) => {
    loading(true);
    const storedPvtKey = await AsyncStorage.getItem(`${network}PrivateKey`);
    walletStore.activeWallet = network;

    if (!storedPvtKey) {
        // Reset the state before switching the wallet
        walletStore.privateKey = null;
        walletStore.address = "--";
        walletStore.balance = 0;
        walletStore.transactionHistory = [];
    }
    else {
        const walletImported = await importWallet({ walletStore, walletType: network, privateKey: storedPvtKey });
        if (!walletImported) {
            // Reset the state before switching the wallet
            walletStore.privateKey = null;
            walletStore.address = "--";
            walletStore.balance = 0;
            walletStore.transactionHistory = [];
        }
    }
    return true;
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


export const removeWallet = action(async (walletType) => {
    try {
        await AsyncStorage.removeItem(`${walletType}PrivateKey`);
        return true;
    } catch (error) {
        console.error("error removing wallet", error);
        return false;
    }
});

export const fetchWalletBalance = action(async (walletStore, loading) => {

});


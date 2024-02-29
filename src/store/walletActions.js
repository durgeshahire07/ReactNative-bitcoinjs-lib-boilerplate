import { action } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const importWallet = action((walletStore, privateKey, walletType) => {
    // Implement logic to import wallet based on walletType (bitcoin or polygon)
    walletStore.privateKey = privateKey;
    walletStore.activeWallet = walletType;
    // Update address and balance
});

export const switchWallet = action(async (walletStore, network) => {
    walletStore.activeWallet = network;
    const privateKey = await AsyncStorage.getItem(`${network}PrivateKey`);

    if (privateKey) {
        walletStore.privateKey = privateKey;
    } else {
        walletStore.privateKey = null;
    }
    // Implement logic to switch network
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

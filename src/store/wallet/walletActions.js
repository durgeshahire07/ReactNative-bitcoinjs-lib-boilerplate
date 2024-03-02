import { action } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosCallAdvanced } from "../../api/main";
import apiEndpoints from "../../api/endpoints"
import { BITCOIN, POLYGON } from "../../constants/commonConstants";
import { Wallet, ethers, Provider } from 'ethers';
import { isPolygonPrivateKeyValid } from "../../utils/stringValidation";

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
        console.error("Error fetching crypto prices:", error);
        return false;
    }
});

export const importWallet = action(async ({ walletStore, walletType, privateKey }) => {
    if (isPolygonPrivateKeyValid(privateKey)) {
        console.log("import wallet for===>", walletType)
        try {
            // const wallet = new Wallet(privateKey);
            const provider = new ethers.AlchemyProvider("maticmum", "v__tED_f4Ncl-dB56BY1XeaHQldWu5VH")
            const wallet = new ethers.Wallet(privateKey, provider);
            const address = await wallet.getAddress();
            const bal = await provider.getBalance(address);
            const balance = ethers.formatEther(bal)

            //updating store values
            walletStore.privateKey = privateKey;
            walletStore.activeWallet = walletType;
            walletStore.address = address;
            walletStore.balance = balance;

            //storing key in storage
            await AsyncStorage.setItem(`${walletType}PrivateKey`, privateKey);

            return true;
        }
        catch (err) {
            console.log("error importing wallet", err)
            return false;
        }

    }
    else {
        return false;
    }

    // Save private key to AsyncStorage
    // AsyncStorage.setItem(`${walletType}PrivateKey`, privateKey);

});

export const switchWallet = action(async (walletStore, network, loading) => {
    loading(true);
    const storedPvtKey = await AsyncStorage.getItem(`${network}PrivateKey`);
    walletStore.activeWallet = network;

    if (!storedPvtKey) {
        console.log("SW: no pvt key")
        // Reset the state before switching the wallet
        walletStore.privateKey = null;
        walletStore.address = "";
        walletStore.balance = 0;
        walletStore.transactionHistory = [];
    }
    else {
        const walletImported = await importWallet({ walletStore, walletType: network, privateKey: storedPvtKey });
        console.log("wallet imported ==>", walletImported)
        if (walletImported) {
            console.log("going inside if")
            console.log(walletStore.address)
        }
        else {
            console.log("going inside else")
            // Reset the state before switching the wallet
            walletStore.privateKey = null;
            walletStore.address = "";
            walletStore.balance = 0;
            walletStore.transactionHistory = [];
        }
        // console.log("SW: pvt key exit")
        // walletStore.balance = 100.00;
        // walletStore.privateKey = storedPvtKey;
        // const wallet = new Wallet(storedPvtKey);
        // if (wallet.address) {
        //     walletStore.address = wallet.address
        // }
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
    console.log("inside wallet remove fn")
    try {
        await AsyncStorage.removeItem(`${walletType}PrivateKey`);
        console.log("success")
        return true;
    } catch (error) {
        console.error("error removing wallet", error);
        return false;
    }
});

export const fetchWalletBalance = action(async (walletStore, loading) => {

});


import { action } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosCallAdvanced } from "../../api/main";
import apiEndpoints from "../../api/endpoints"
import { BITCOIN, POLYGON } from "../../constants/commonConstants";

export const importWallet = action((walletStore, privateKey, walletType) => {
    // Implement logic to import wallet based on walletType (bitcoin or polygon)
    walletStore.privateKey = privateKey;
    walletStore.activeWallet = walletType;
    // Update address and balance
});

export const switchWallet = action(async (walletStore, network) => {
    // Reset the state before switching the wallet
    walletStore.privateKey = null;
    walletStore.address = "";
    walletStore.balance = 0;
    walletStore.transactionHistory = [];

    walletStore.activeWallet = network;
    const privateKey = await AsyncStorage.getItem(`${network}PrivateKey`);

    if (privateKey) {
        walletStore.privateKey = privateKey;
    } else {
        walletStore.privateKey = null;
    }
    // Implement logic to switch network
});

// Action to fetch cryptocurrency prices
export const fetchCryptoPrices = action(async (walletStore, setLoading) => {
    try {
        const activeWallet = walletStore.activeWallet;
        let endpoint = "";

        if (activeWallet === BITCOIN) {
            endpoint = apiEndpoints.cryptoPrice.bitcoin
        } else if (activeWallet === POLYGON) {
            endpoint = apiEndpoints.cryptoPrice.bitcoin;
        } else {
            console.error("Invalid active wallet:", activeWallet);
            return;
        }
        // Fetch cryptocurrency price
        const response = await axiosCallAdvanced({
            baseURL: endpoint,
            method: apiEndpoints.methodType.get,
        });

        if (response.data) {
            console.log("response=====>", response.data)
            walletStore.selectedCryptoPrice = response?.data?.price || 0;
            console.log("wallet updated", walletStore.selectedCryptoPrice)
            setLoading(false)
        }

    } catch (error) {
        console.error("Error fetching crypto prices:", error);
    } finally {
    }
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

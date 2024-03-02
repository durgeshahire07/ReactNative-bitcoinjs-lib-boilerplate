import { action } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosCallAdvanced } from "../../api/main";
import apiEndpoints from "../../api/endpoints"
import { BITCOIN, POLYGON } from "../../constants/commonConstants";
import { Wallet, ethers, Provider } from 'ethers';
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
        walletAddress = await wallet.getAddress();
        console.log("address===>", walletAddress)
        const headers = new Headers({
            'Accept': 'application/json',
            'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjBlMzZhNTc3LTAwMWEtNDc0OS05ZTI1LWRiNzdiMDY0ZmE1MyIsIm9yZ0lkIjoiMzgwNzY1IiwidXNlcklkIjoiMzkxMjUyIiwidHlwZUlkIjoiMGMwYjZiNGMtZmM3NS00NTY5LWJlZjctN2RmZWMyZWVjNDhhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDkzMTAyMDYsImV4cCI6NDg2NTA3MDIwNn0.vkujfqc89FlQn5tq4jYxrOrhUioPDUllqLeIcDw5-kk',
        });
        // Fetch data
        fetch(`https://deep-index.moralis.io/api/v2.2/${walletAddress}/balance?chain=mumbai`,
            {
                method: 'GET',
                headers: headers,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Handle the response data here
                console.log('Response Data:', data);
                // Convert Wei to MATIC
                const balanceInMATIC = Number(data.balance) / 1e18;
                // Store the response in an object
                const responseObject = {
                    balance: balanceInMATIC,
                    status: 'success',
                };

                console.log('Stored Response Object:', responseObject);
            })
            .catch(error => {
                console.error('Error:', error.message);

                // If an error occurs, store an error response in the object
                const errorResponse = {
                    error: error.message,
                    status: 'error',
                };

                console.log('Stored Error Response:', errorResponse);
            });
        // walletStore.privateKey = privateKey;
        // walletStore.activeWallet = walletType;
        // await AsyncStorage.setItem(`${walletType}PrivateKey`, privateKey);

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


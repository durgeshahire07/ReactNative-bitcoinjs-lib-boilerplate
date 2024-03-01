import { observable, computed, action } from "mobx";
// import * as WalletActions from "./cryptoActions";
import { axiosCallAdvanced } from "../../api/main";
import apiEndpoints from "../../api/endpoints"
import { BITCOIN, POLYGON, BTC, USDT } from "../../constants/commonConstants";
import axios from "axios";

class CryptoValueStore {
    @observable value = null;
    @observable error = null;

    @computed
    get formattedValue() {
        return this.value ? this.value.toFixed(2) : '--'; // Display formatted value or placeholder
    }

    @action
    async fetchValue() { // Pass walletData for potential dynamic API URLs
        this.error = null;

        try {
            let endpoint = "";
    
            // if (activeWallet === BITCOIN) {
            //     endpoint = apiEndpoints.cryptoPrice.bitcoin
            // } else if (activeWallet === POLYGON) {
            //     endpoint = apiEndpoints.cryptoPrice.bitcoin;
            // } else {
            //     return;
            // }

            const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
            this.value = response.data.price;

            console.log("value updated", this.value)
            return true;

        } catch (err) {
            console.error('Error fetching Bitcoin value:', err);
            this.error = err;
            return false;
        } finally {
        }
    }

    reset() {
        this.value = null;
        this.error = null;
    }
}

const cryptoValueStore = new CryptoValueStore();
export default cryptoValueStore;
import { observable, computed, action } from "mobx";
import { axiosCallAdvanced } from "../../api/main";
import apiEndpoints from "../../api/endpoints"
import { BITCOIN } from "../../constants/commonConstants";

class CryptoValueStore {
    @observable value = null;
    @observable error = null;

    @computed
    get formattedValue() {
        return this.value ? this.value.toFixed(2) : '--';
    }

    @action
    async fetchValue(selectedWallet) { 
        this.error = null;
        try {
            let cryptoValApi = selectedWallet === BITCOIN ? apiEndpoints.cryptoPrice.bitcoin : apiEndpoints.cryptoPrice.matic  

            const response = await axiosCallAdvanced({
                baseURL: cryptoValApi,
            });

            this.value = response.data.price;

            return true;

        } catch (err) {
            console.error('Error fetching crypto value:', err);
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
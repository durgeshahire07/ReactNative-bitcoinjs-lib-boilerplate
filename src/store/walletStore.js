import { observable, computed } from "mobx";
import * as WalletActions from "./walletActions";

class WalletStore {
  @observable activeWallet = "bitcoin";
  @observable privateKey = "";
  @observable address = "";
  @observable balance = 0;
  @observable transactionHistory = [];

  // Load wallets from local storage when the store is created
  constructor() {
    WalletActions.loadWalletFromLocalStorage(this);
  }

  switchNetwork = WalletActions.switchNetwork;

  @computed get currentNetworkCurrency() {
    return this.activeWallet === "bitcoin" ? "BTC" : "USDT";
  }
}

const walletStore = new WalletStore();
export default walletStore;

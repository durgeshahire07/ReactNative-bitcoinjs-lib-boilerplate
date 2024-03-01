import { observable, computed } from "mobx";
import * as WalletActions from "./walletActions";
import { BITCOIN, POLYGON, BTC, USDT } from "../../constants/commonConstants";

class WalletStore {
  @observable activeWallet = BITCOIN;
  @observable privateKey = null;
  @observable address = "";
  @observable balance = 0;
  @observable transactionHistory = [];

  // Load wallets from local storage when the store is created
  constructor() {
    WalletActions.loadWalletFromLocalStorage(this);
  }

  switchWallet = WalletActions.switchWallet;
  importWallet = WalletActions.importWallet;
  isWalletActive = WalletActions.isWalletActive;

  @computed get currentNetworkCurrency() {
    return this.activeWallet === BITCOIN ? BTC : USDT;
  }
}

const walletStore = new WalletStore();
export default walletStore;

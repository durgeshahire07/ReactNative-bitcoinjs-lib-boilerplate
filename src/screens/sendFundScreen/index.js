import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import walletStore from "../../store/wallet/walletStore";
import LabeledInput from "../../components/labeledInput";
import PrimaryButton from "../../components/primaryButton";
import { canTransferFunds, isValidPolygonAddress, isValidBitcoinAddress } from "../../utils/stringValidation";
import { useNavigation } from "@react-navigation/native";
import { AMOUNT, BITCOIN, ENTER_ADDRESS, ENTER_AMOUNT, ENTER_PUB_BTC_ADD, ENTER_PUB_POL_ADD, POLYGON, SEND_FUNDS, TRANSACTION_DETAILS_SCREEN } from "../../constants/commonConstants";

const SendFunds = () => {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [recieverAddressError, setRecieverAddressError] = useState("");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleButtonPress = async () => {

    if (walletStore.activeWallet === POLYGON) {
      //remove above condition later on
      if (!validateReciverAddress() || !validateAmount()) {
        return;
      }
      setLoading(true);
      const transaction = await walletStore.sendFunds(walletStore, receiverAddress, amount);
      setLoading(false);
      if (transaction.status) {
        navigation.navigate(TRANSACTION_DETAILS_SCREEN, { transactionHash: transaction.txHash })
      } else {
        Alert.alert("Transaction Failed", transaction.errorMessage)
      }
    }
    else {
      setLoading(true);

      const transaction = await walletStore.sendFunds(walletStore, receiverAddress, amount);
      setLoading(false);
      if (transaction.status) {
        navigation.navigate(TRANSACTION_DETAILS_SCREEN, { transactionHash: transaction.txHash })
      } else {
        Alert.alert("Transaction Failed", transaction.errorMessage)
      }
    }
  };

  const validateReciverAddress = () => {
    if (!receiverAddress) {
      setRecieverAddressError("Address is required");
      return false;
    }

    if (walletStore.activeWallet === POLYGON) {
      if (!isValidPolygonAddress(receiverAddress)) {
        setRecieverAddressError("Invalid address");
        return false;
      }
    }
    if (walletStore.activeWallet === BITCOIN) {
      if (!isValidBitcoinAddress(receiverAddress)) {
        setRecieverAddressError("Invalid address");
        return false;
      }
    }

    setRecieverAddressError("");
    return true;
  };

  const validateAmount = () => {
    if (!amount) {
      setAmountError("Amount is required");
      return false;
    }

    if (!canTransferFunds(walletStore.balance, amount)) {
      setAmountError("Inefficient funds");
      return false;
    }

    setAmountError("");
    return true;
  }

  const handleReciverAddressInput = (text) => {
    if (recieverAddressError) {
      setRecieverAddressError("");
    }
    setReceiverAddress(text);
  }

  const handleAmountInput = (text) => {
    if (amountError) {
      setAmountError("");
    }
    setAmount(text)
  }

  useEffect(() => {
  }, []);

  return (
    <ScrollView style={styles.sendFundsComponent}>
      <LabeledInput
        label={ENTER_ADDRESS}
        placeholder={walletStore.activeWallet === BITCOIN ? ENTER_PUB_BTC_ADD : ENTER_PUB_POL_ADD}
        onChangeText={(text) => handleReciverAddressInput(text)}
        value={receiverAddress}
        error={recieverAddressError}
      />
      <LabeledInput
        label={AMOUNT}
        placeholder={ENTER_AMOUNT}
        onChangeText={(text) => handleAmountInput(text)}
        value={amount}
        error={amountError}
        showNumpad={true}
      />
      <View style={styles.balanceTextContainer}>
        <Text style={styles.balanceText}>Available Balance: {walletStore.balance} {walletStore.activeWallet === BITCOIN ? 'BTC' : 'MATIC'}</Text>
      </View>
      <PrimaryButton onPress={handleButtonPress} text={SEND_FUNDS} showLoader={loading} />
    </ScrollView>
  );
};

export default SendFunds;

const styles = StyleSheet.create({
  sendFundsComponent: {
    backgroundColor: "#ffffffab",
    flex: 1,
    padding: 20,
  },
  balanceTextContainer: {
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 16,
    color: "#333",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import LabeledInput from "../../../components/labeledInput";
import PrimaryButton from "../../../components/primaryButton";
import walletStore from "../../../store/wallet/walletStore";
import { BITCOIN, POLYGON } from "../../../constants/commonConstants";
import { isPolygonPrivateKeyValid, isValidBitcoinPrivateKey } from "../../../utils/stringValidation";

const ImportWallet = ({ updateFetchWallet }) => {

  const [enteredPrivateKey, setEnteredPrivateKey] = useState("");
  const [inputError, setInputError] = useState("");
  const activeWalletName = walletStore.activeWallet;

  const handleButtonPress = async () => {
    if (!validateInput()) {
      return;
    }
    else {
      updateFetchWallet({ state: true, key: enteredPrivateKey });
    }
  };

  const validateInput = () => {
    if (!enteredPrivateKey) {
      setInputError("Private key is required");
      return false;
    }

    if (walletStore.activeWallet === POLYGON) {
      if (!isPolygonPrivateKeyValid(enteredPrivateKey)) {
        setInputError("Invalid key");
        return false;
      }
    }

    if (walletStore.activeWallet === BITCOIN) {
      if (!isValidBitcoinPrivateKey(enteredPrivateKey)) {
        setInputError("Invalid key");
        return false;
      }
    }

    setInputError("");
    return true;
  };

  const handlePrivateKeyInput = (text) => {
    if (inputError) {
      setInputError("");
    }
    setEnteredPrivateKey(text);
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.messageText}>
          Please import your {activeWalletName} wallet
        </Text>
      </View>
      <LabeledInput
        placeholder="Enter Private Key"
        secureTextEntry={true}
        onChangeText={(text) => handlePrivateKeyInput(text)}
        value={enteredPrivateKey}
        error={inputError}
      />
      <PrimaryButton onPress={() => handleButtonPress} text="Import Wallet" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    /* flex: 1; */
  },
  textContainer: {
    alignItems: "center",
  },
  messageText: {
    marginBottom: 20,
    fontSize: 18,
  },
});

export default ImportWallet;

import React, { useState } from "react";
import styled from "styled-components/native";
import LabeledInput from "../../../components/labeledInput";
import PrimaryButton from "../../../components/primaryButton";
import walletStore from "../../../store/wallet/walletStore";
import { BITCOIN, POLYGON } from "../../../constants/commonConstants";
import { Wallet } from 'ethers';
import { isPolygonPrivateKeyValid } from "../../../utils/stringValidation";

const ImportWallet = ({ updateFetchWallet }) => {

  const [enteredPrivateKey, setEnteredPrivateKey] = useState("");
  const [inputError, setInputError] = useState("");
  const activeWalletName = walletStore.activeWallet;

  const handleButtonPress = async () => {
    if (!validateInput()) {
      return;
    }
    else{
      updateFetchWallet({ state: true, key: enteredPrivateKey });
    }
  };

  const validateInput = () => {
    if (!enteredPrivateKey) {
      setInputError("Private key is required");
      return false;
    }

    if (!isPolygonPrivateKeyValid(enteredPrivateKey)) {
      setInputError("Invalid key");
      return false;
    }

    setInputError("");
    return true;
  };

  const handlePrivateKeyInput = (text) => {
    setEnteredPrivateKey(text);
    setInputError("");
  }

  return (
    <Container>
      <TextContainer>
        <MessageText>
          Please import your {activeWalletName} wallet
        </MessageText>
      </TextContainer>
      <LabeledInput
        placeholder="Enter Private Key"
        secureTextEntry={true}
        onChangeText={(text) => handlePrivateKeyInput(text)}
        value={enteredPrivateKey}
        error={inputError}
      />
      <PrimaryButton onPress={handleButtonPress} text="Import Wallet" />
    </Container>
  );
};

export default ImportWallet;

const Container = styled.View`
  /* flex: 1; */
`;

const TextContainer = styled.View`
  align-items: center;
`

const MessageText = styled.Text`
  margin-bottom: 20px;
  font-size: 18px;
`;

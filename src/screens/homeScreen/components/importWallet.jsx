import React, { useState } from "react";
import styled from "styled-components/native";
import LabeledInput from "../../../components/labeledInput";
import PrimaryButton from "../../../components/primaryButton";
import walletStore from "../../../store/walletStore";
import { BITCOIN, POLYGON } from "../../../constants/commonConstants";

const ImportWallet = () => {

  const [enterPrivateKey, setEnterPrivateKey] = useState("");
  const [inputError, setInputError] = useState("");
  const activeWalletName = walletStore.activeWallet;
  
  const handleButtonPress = () => {
    if (!validateInput()) {
      return;
    }

  };

  const validateInput = () => {
    if (!enterPrivateKey) {
      setInputError("Private key is required");
      return false;
    }

    setInputError("");
    return true;
  };

  const handlePrivateKeyInput = (text) => {
    setEnterPrivateKey(text);
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
        value={enterPrivateKey}
        error={inputError}
      />
       <PrimaryButton onPress={handleButtonPress} text="Import Wallet" />
    </Container>
  );
};

export default ImportWallet;

const Container = styled.View`
  flex: 1;
`;

const TextContainer = styled.View`
  align-items: center;
`

const MessageText = styled.Text`
  margin-bottom: 20px;
  font-size: 18px;
`;

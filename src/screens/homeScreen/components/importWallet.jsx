import React, { useState } from "react";
import styled from "styled-components/native";
import { TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"; // Make sure to install the Feather icon package
import LabeledInput from "../../../components/labeledInput";
import walletStore from "../../../store/walletStore";
import { BITCOIN, POLYGON } from "../../../constants/commonConstants";

const ImportWallet = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const activeWalletName = walletStore.activeWallet;
  const handleEyePress = (isPasswordVisible) => {
    // Handle logic when eye icon is pressed
    console.log(`Password visibility toggled: ${isPasswordVisible}`);
  };
  return (
    <Container>
      <TextContainer>
        <MessageText>
          Please enter your {activeWalletName} wallet's private key to import your wallet information.
        </MessageText>
      </TextContainer>
      <LabeledInput
        placeholder="Enter Private Key"
        secureTextEntry={true}
        onEyePress={handleEyePress}
      />
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

const InputContainer = styled.View`
width: 80%;
margin-bottom: 20px;
flex-direction: row;
align-items: center;
`;

const LabelContainer = styled.View`
flex-direction: row;
align-items: center;
margin-right: 10px;
`;

const IconWrapper = styled.View`
margin-right: 5px;
`;

const LabelText = styled.Text`
font-size: 16px;
color: #333;
`;

const StyledTextInput = styled.TextInput`
flex: 1;
padding: 10px;
border-radius: 10px;
border: 1px solid #ccc;
`;

const ToggleEyeButton = styled(TouchableOpacity)`
padding: 10px;
`;
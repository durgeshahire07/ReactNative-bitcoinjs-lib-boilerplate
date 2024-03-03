import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

const PrimaryButton = ({ onPress, text, showLoader }) => {
  return (
    <ButtonContainer onPress={showLoader ? null : onPress}>
      {
        showLoader ?
          <ActivityIndicator size="small" color="#fff" />
          :
          <ButtonText>{text}</ButtonText>
      }
    </ButtonContainer>
  );
};

export default PrimaryButton;

const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  border-radius: 30px;
  background-color: #3498db;
`;

const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

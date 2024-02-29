import React from "react";
import styled from "styled-components/native";

const PrimaryButton = ({ onPress, text }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
};

export default PrimaryButton;

const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  border-radius: 30px;
  background-color: #203e94;
`;

const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 16px;
`;

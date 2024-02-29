import React, { useState } from "react";
import styled from "styled-components/native";
import { TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const LabeledInput = ({ label, placeholder, secureTextEntry, onEyePress }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Container>
      <LabelContainer>
        <LabelText>{label}</LabelText>
      </LabelContainer>

      <InputContainer>
        <StyledTextInput
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
        />
        {secureTextEntry && (
          <ToggleEyeButton onPress={() => {
            setIsPasswordVisible(!isPasswordVisible);
            onEyePress && onEyePress(!isPasswordVisible);
          }}>
            <Feather name={isPasswordVisible ? "eye" : "eye-off"} size={24} color="black" />
          </ToggleEyeButton>
        )}
      </InputContainer>
    </Container>
  );
};

export default LabeledInput;

const Container = styled.View`
  margin-bottom: 20px;
`;

const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const LabelText = styled.Text`
  font-size: 16px;
  color: #333;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  padding: 16px;
  border-radius: 30px;
  border: 1px solid #ccc;
`;

const ToggleEyeButton = styled(TouchableOpacity)`
  position: absolute;
  right: 10px;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

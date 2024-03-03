import React, { useState } from "react";
import styled from "styled-components/native";
import { TextInput, TouchableOpacity, Keyboard } from "react-native";
import { Feather } from "@expo/vector-icons";

const LabeledInput = ({ label, placeholder, value, onChangeText, secureTextEntry, error, showNumpad }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const keyboardType = showNumpad ? "numeric" : "default";

  return (
    <Container>
      {label && (
        <LabelContainer>
          <LabelText>{label}</LabelText>
        </LabelContainer>
      )}
      <InputContainer>
        <StyledTextInput
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onChangeText={onChangeText}
          value={value}
          error={error}
          keyboardType={keyboardType}
        />
        {secureTextEntry && (
          <ToggleEyeButton
            onPress={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
          >
            <Feather name={isPasswordVisible ? "eye" : "eye-off"} size={20} color="#494949ae" />
          </ToggleEyeButton>
        )}
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
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

//to add padding-left only for eye icon
const StyledTextInput = styled.TextInput`
    flex: 1;
    padding: 16px 16px 16px 16px;
    padding-right: 50px;
    border-radius: 30px;
    border: 1px solid ${({ error }) => (error ? "red" : "#ccc")};
`;

const ToggleEyeButton = styled(TouchableOpacity)`
    position: absolute;
    right: 20px;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const ErrorMessage = styled.Text`
    color: red;
    margin: 5px 0px 0px 5px;
`;

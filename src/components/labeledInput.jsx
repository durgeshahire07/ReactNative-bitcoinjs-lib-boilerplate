import React, { useState } from "react";
import styled from "styled-components/native";
import { TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const LabeledInput = ({ label, placeholder, value, onChangeText, secureTextEntry, onEyePress, error }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <Container>
            {label &&
                <LabelContainer>
                    <LabelText>{label}</LabelText>
                </LabelContainer>
            }
            <InputContainer>
                <StyledTextInput
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    onChangeText={onChangeText}
                    value={value}
                    error={error}
                />
                {secureTextEntry && (
                    <ToggleEyeButton onPress={() => {
                        setIsPasswordVisible(!isPasswordVisible);
                        onEyePress && onEyePress(!isPasswordVisible);
                    }}>
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

const StyledTextInput = styled.TextInput`
  flex: 1;
  padding: 16px;
  border-radius: 30px;
  /* border: 1px solid #ccc; */
  border: 1px solid ${({ error }) => (error ? 'red' : '#ccc')}; 
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

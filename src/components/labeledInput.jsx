import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const LabeledInput = ({ label, placeholder, value, onChangeText, secureTextEntry, error, showNumpad }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const keyboardType = showNumpad ? "numeric" : "default";

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.styledTextInput,
            { borderColor: error ? "red" : "#ccc" },
          ]}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.toggleEyeButton}
            onPress={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
          >
            <Feather name={isPasswordVisible ? "eye" : "eye-off"} size={20} color="#494949ae" />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

export default LabeledInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  styledTextInput: {
    flex: 1,
    padding: 16,
    borderRadius: 30,
    borderWidth: 1,
  },
  toggleEyeButton: {
    position: "absolute",
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  errorMessage: {
    color: "red",
    margin: 5,
  },
});

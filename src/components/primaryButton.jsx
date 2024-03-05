import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";

const PrimaryButton = ({ onPress, text, showLoader }) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={showLoader ? null : onPress}
    >
      {showLoader ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    padding: 15,
    borderRadius: 30,
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

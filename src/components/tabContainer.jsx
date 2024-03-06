import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { PRIMARY_COLOR, WHITE_COLOR } from "../constants/commonConstants";

const TabContainer = ({ options, onTabPress, activeTab, ...props }) => {
  const calculateButtonWidth = () => {
    const buttonWidth = 100 / options.length;
    return `${buttonWidth}%`;
  };

  const handleTabPress = (option) => {
    onTabPress && onTabPress(option);
  };

  return (
    <View style={[styles.tabContainerWrapper, props.style]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.tabButton,
            {
              backgroundColor: activeTab === option ? 'white' : 'transparent',
              elevation: activeTab === option ? 5 : 0
            },
          ]}
          onPress={() => handleTabPress(option)}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === option ? "black" : "grey",
                fontWeight: activeTab === option ? "bold" : "normal",
              },
            ]}
          >
            {option.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabContainer;

const styles = StyleSheet.create({
  tabContainerWrapper: {
    width: "100%",
    flexDirection: "row",
    padding: 5,
    backgroundColor: "#eeeeeec8",
    borderRadius: 40,
  },
  tabButton: {
    flex: 1, // Use flex: 1 to take the available space evenly
    padding: 16,
    borderRadius: 30,
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
    backgroundColor: "transparent", // Set a default background color
  },
  tabText: {
    textAlign: "center",
    color: "black",
    fontWeight: "normal",
  },
});
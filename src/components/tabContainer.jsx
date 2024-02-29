import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
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
    <TabContainerWrapper {...props}>
      {options.map((option) => (
        <TabButton
          key={option}
          isSelected={activeTab === option}
          onPress={() => handleTabPress(option)}
          buttonWidth={calculateButtonWidth()}
        >
          <TabText isSelected={activeTab === option}>{option}</TabText>
        </TabButton>
      ))}
    </TabContainerWrapper>
  );
};

export default TabContainer;

const TabContainerWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 5px;
  background-color: #dcdcdc; /* Grey background color */
  border-radius: 40px;
`;

const TabButton = styled(TouchableOpacity)`
  flex: ${({ buttonWidth }) => buttonWidth};
  padding: 16px 10px;
  border-radius: 30px;
  background-color: ${({ isSelected }) => (isSelected ? PRIMARY_COLOR : "transparent")}; /* Blue background for selected tab */
`;

const TabText = styled.Text`
  text-align: center;
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#000")}; /* White text for selected, black for unselected */
`
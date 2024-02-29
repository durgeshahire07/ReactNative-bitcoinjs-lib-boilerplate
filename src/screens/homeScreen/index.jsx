import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import walletStore from "../../store/walletStore";
import TabContainer from "../../components/tabContainer";

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState("Bitcoin");

  const handleTabPress = (selectedOption) => {
    console.log(`Selected option: ${selectedOption}`);
    setActiveTab(selectedOption);

    // Call the switchNetwork action in the walletStore
    walletStore.switchNetwork(walletStore, selectedOption.toLowerCase())
    // Add any logic you need when a tab is pressed
  };

  useEffect(()=>{
    console.log(walletStore.activeWallet)
},[])

  return (
    <Container>
      <TopContainer>
        <TabContainer
          options={["Bitcoin", "Polygon"]}
          onTabPress={handleTabPress}
          activeTab={activeTab}
        />
      </TopContainer>

      <Text>selected wallet is: {walletStore.activeWallet}</Text>
     
    </Container>
  );
};

export default HomeScreen;

const Container = styled.View`
  flex: 1;
  padding: 0px 20px;
`;

const TopContainer = styled.View`
  align-items: center;
  padding: 20px;
`;

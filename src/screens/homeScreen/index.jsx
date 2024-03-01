import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import walletStore from "../../store/wallet/walletStore";
import TabContainer from "../../components/tabContainer";
import ImportWallet from "./components/importWallet";
import CurrencyPrice from "./components/currencyPrice";
import { BITCOIN, POLYGON } from "../../constants/commonConstants";

const HomeScreen = () => {
    const tabOptions = [BITCOIN, POLYGON]
    const [activeTab, setActiveTab] = useState(tabOptions[0]);
    const [privateKey, setPrivateKey] = useState(null);

    const handleTabPress = (selectedOption) => {
        setActiveTab(selectedOption);

        // Call the switchNetwork action in the walletStore
        walletStore.switchWallet(walletStore, selectedOption.toLowerCase())
        fetchPrivateKey();
    };

    const fetchPrivateKey = () => {
        setPrivateKey(walletStore.privateKey)
    };

    useEffect(() => {
        // Fetch private key on inital render
        fetchPrivateKey();
        console.log(privateKey)
    }, []);

    return (
        <React.Fragment>
            <TopContainer>
                <TabContainer
                    options={tabOptions}
                    onTabPress={handleTabPress}
                    activeTab={activeTab}
                />
            </TopContainer>
            <CurrencyPrice />
            <Container>
                {privateKey ? (
                    <Text>Selected Network {walletStore.activeWallet}: key: {privateKey}</Text>
                ) : (
                    <ImportWallet />
                )}

            </Container>
        </React.Fragment>
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

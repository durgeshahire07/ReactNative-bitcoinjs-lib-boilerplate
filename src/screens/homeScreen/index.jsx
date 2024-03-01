import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import walletStore from "../../store/wallet/walletStore";
import TabContainer from "../../components/tabContainer";
import ImportWallet from "./components/importWallet";
import CurrencyPrice from "./components/currencyPrice";
import { BITCOIN, POLYGON } from "../../constants/commonConstants";
import WalletComponent from "./components/walletComponent";

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

    // const [privateKey, setPrivateKey] = useState('c0872b9039888bce87ffd8f7823907647dd0c2158bd88eecad5f1536a9e623d9');
    // const wallet = new Wallet(privateKey);
    // console.log("wallet=======>", wallet)
    // const importWallet = async () => {
    //     try {


    //         // Use the wallet to interact with contracts, send transactions, etc.
    //     } catch (error) {
    //         console.error('Error importing wallet:', error);
    //     }
    // };

    // useEffect(()=>{
    //     importWallet();
    // }, [])

    return (
        <HomeConatainer>
            <TopContainer>
                <TabContainer
                    options={tabOptions}
                    onTabPress={handleTabPress}
                    activeTab={activeTab}
                />
            </TopContainer>
            <WalletComponent />

            {/* <CurrencyPrice /> */}
            {/* <Container>
                {privateKey ? (
                    <Text>Selected Network {walletStore.activeWallet}: key: {privateKey}</Text>
                ) : (
                    <ImportWallet />
                )}

            </Container> */}
        </HomeConatainer>
    );
};

export default HomeScreen;

const HomeConatainer = styled.ScrollView`
background-color: white;
flex: 1;

`
const Container = styled.View`
  padding: 0px 20px;
`;

const TopContainer = styled.View`
  align-items: center;
  padding: 20px;
`;

import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Alert, ToastAndroid } from "react-native";
import walletStore from "../../store/wallet/walletStore";
import TabContainer from "../../components/tabContainer";
import ImportWallet from "./components/importWallet";
import CurrencyPrice from "./components/currencyPrice";
import { BITCOIN, POLYGON } from "../../constants/commonConstants";
import WalletComponent from "./components/walletComponent";

const HomeScreen = () => {
    const tabOptions = [BITCOIN, POLYGON]
    const [activeTab, setActiveTab] = useState(tabOptions[0]);
    const [showWallet, setShowWallet] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetchWallet, setFetchWallet] = useState({
        state: false,
        key: ''
    });

    const checkWalletStatus = async () => {
        const isWalletActive = await walletStore.isWalletActive(walletStore, activeTab, setLoading);
        if (isWalletActive) {
            setShowWallet(true);
            console.log("show wallet")
        } else {
            setShowWallet(false);
        }
        setLoading(false)
    };

    const handleTabPress = (selectedOption) => {
        setActiveTab(selectedOption);

        // Call the switchNetwork action in the walletStore
        walletStore.switchWallet(walletStore, selectedOption.toLowerCase(), setLoading)
        checkWalletStatus();
    };

    const performWalletImport = async () => {
        const walletImported = await walletStore.importWallet({ walletStore: walletStore, walletType: activeTab, privateKey: fetchWallet.key });
        setLoading(false);
        if (walletImported) {
            checkWalletStatus();
        }
        else {
            Alert.alert("Something went wrong... Try again later!")
        }
    }
    useEffect(() => {
        if (fetchWallet.state) {
            console.log("wallet fetch is true========> checkinf wallet status")
            setLoading(true);
            performWalletImport();
            // checkWalletStatus();
        }
    }, [fetchWallet])

    console.log("fetch wallet state======>", fetchWallet.state)

    useEffect(() => {
        setLoading(true);
        checkWalletStatus();
    }, [activeTab]);

    return (
        <HomeConatainer>
            <TopContainer>
                <TabContainer
                    options={tabOptions}
                    onTabPress={handleTabPress}
                    activeTab={activeTab}
                />
            </TopContainer>

            {
                loading ?
                    <ActivityIndicator size="large" color="#3498db" />
                    :
                    <Container>
                        {showWallet ? (
                            <WalletComponent />
                        ) : (
                            <ImportWallet updateFetchWallet={setFetchWallet} />
                        )}
                    </Container>
            }


            {/* <CurrencyPrice /> */}



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

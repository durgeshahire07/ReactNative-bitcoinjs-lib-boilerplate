import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Alert, ToastAndroid } from "react-native";
import walletStore from "../../store/wallet/walletStore";
import LabeledInput from "../../components/labeledInput";
import PrimaryButton from "../../components/primaryButton";
import { BITCOIN, POLYGON } from "../../constants/commonConstants";

const TransactionDetailScreen = ({ route }) => {
    // const transactionHash = route.params?.transactionHash;
    const transactionHash = '0x352ec1fa3fc57cc85ad7bd85a33dd36141f53b46d10b5a25542afa62ef6ccf8a'
    
    const [loading, setLoading] = useState(false);
    console.log(transactionHash)
    const handleButtonPress = async () => {

    };


    useEffect(() => {
    }, []);

    return (
        <TransactionDetailComponent>

            <BalanceTextContainer>
                <TransactionStatusText>Transaction Successful</TransactionStatusText>
                <TransactionDetailText>Transaction Hash: {transactionHash}</TransactionDetailText>
                {/* <TransactionDetailText>Transaction Successful</TransactionDetailText> */}

            </BalanceTextContainer>

            <PrimaryButton onPress={handleButtonPress} text="Go to Block Explorer" />
        </TransactionDetailComponent>
    );
};

export default TransactionDetailScreen;

const TransactionDetailComponent = styled.ScrollView`
background-color: #ffffffab;
flex: 1;
padding: 20px 20px;
`

const BalanceTextContainer = styled.View`
    margin: 0px 0px 20px;
`

const TransactionStatusText = styled.Text`
  font-size: 22px;
  color: #333;
`;

const TransactionDetailText = styled.Text`
  font-size: 16px;
  color: #333;
  margin: 10px 0px;
`;
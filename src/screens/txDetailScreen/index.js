import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Alert, Linking } from "react-native";
import walletStore from "../../store/wallet/walletStore";
import LabeledInput from "../../components/labeledInput";
import PrimaryButton from "../../components/primaryButton";
import { BITCOIN, POLYGON } from "../../constants/commonConstants";

const TransactionDetailScreen = ({ route }) => {
    const transactionHash = route.params?.transactionHash;
    const [txData, setTxData] = useState({
        hash: transactionHash,
        from: '--',
        to: '--',
        gasFee: '--',
        amount: '--'
    })


    const [loading, setLoading] = useState(true);
    const handleButtonPress = async () => {
        const blockExplorerUrl = `https://mumbai.polygonscan.com/tx/${transactionHash}`;

        // Open the URL in the default browser or browser app
        Linking.openURL(blockExplorerUrl).catch((err) => {
            console.error('Error opening URL:', err);
            // Handle the error as needed
        });
    };

    const fetchTransactionData = async () => {
        const data = await walletStore.getTransactionData(walletStore, transactionHash)
        console.log("data==>", data)
        if (data.status) {
            setTxData({
                hash: transactionHash,
                from: data.from,
                to: data.to,
                gasFee: data.gasFee,
                amount: data.amount
            })
        }
        else {
            Alert.alert("Error", "Something went wrong")
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchTransactionData()
    }, []);

    return (
        <TransactionDetailComponent>
            {
                loading ?
                    <ActivityIndicator size="large" color="#3498db" />
                    :
                    <>
                        <BalanceTextContainer>
                            <TransactionStatusText>Transaction Successful</TransactionStatusText>
                            <TransactionDetailText>Amount Transferred: {txData.amount}</TransactionDetailText>
                            <TransactionDetailText>Gas {txData.gasFee}</TransactionDetailText>
                            <TransactionDetailText>From: {txData.from}</TransactionDetailText>
                            <TransactionDetailText>To: {txData.to}</TransactionDetailText>
                            <TransactionDetailText>Transaction Hash: {transactionHash}</TransactionDetailText>
                        </BalanceTextContainer>

                        <PrimaryButton onPress={handleButtonPress} text="Go to Block Explorer" />
                    </>
            }
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
  margin: 0px 0px 10px 0px; 
`;

const TransactionDetailText = styled.Text`
  font-size: 16px;
  color: #333;
  margin: 10px 0px;
`;
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import walletStore from "../../store/wallet/walletStore";
import LabeledInput from "../../components/labeledInput";
import PrimaryButton from "../../components/primaryButton";
import { BITCOIN, POLYGON } from "../../constants/commonConstants";

const TransactionDetailScreen = ({ route }) => {
  const transactionHash = route.params?.transactionHash;
  const [txData, setTxData] = useState({
    hash: transactionHash,
    from: "--",
    to: "--",
    gasFee: "--",
    amount: "--",
  });

  const [loading, setLoading] = useState(true);

  const handleButtonPress = async () => {
    const blockExplorerUrl = `https://mumbai.polygonscan.com/tx/${transactionHash}`;

    // Open the URL in the default browser or browser app
    Linking.openURL(blockExplorerUrl).catch((err) => {
      console.error("Error opening URL:", err);
      // Handle the error as needed
    });
  };

  const fetchTransactionData = async () => {
    const data = await walletStore.getTransactionData(walletStore, transactionHash);
    console.log("data==>", data);
    if (data.status) {
      setTxData({
        hash: transactionHash,
        from: data.from,
        to: data.to,
        gasFee: data.gasFee,
        amount: data.amount,
      });
    } else {
      Alert.alert("Error", "Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  return (
    <ScrollView style={styles.transactionDetailComponent}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <>
          <View style={styles.balanceTextContainer}>
            <Text style={styles.transactionStatusText}>Transaction Successful</Text>
            <Text style={styles.transactionDetailText}>Amount Transferred: {txData.amount}</Text>
            <Text style={styles.transactionDetailText}>Gas {txData.gasFee}</Text>
            <Text style={styles.transactionDetailText}>From: {txData.from}</Text>
            <Text style={styles.transactionDetailText}>To: {txData.to}</Text>
            <Text style={styles.transactionDetailText}>Transaction Hash: {transactionHash}</Text>
          </View>

          <PrimaryButton onPress={handleButtonPress} text="Go to Block Explorer" />
        </>
      )}
    </ScrollView>
  );
};

export default TransactionDetailScreen;

const styles = StyleSheet.create({
  transactionDetailComponent: {
    backgroundColor: "#ffffffab",
    flex: 1,
    padding: 20,
  },
  balanceTextContainer: {
    margin: 0,
  },
  transactionStatusText: {
    fontSize: 22,
    color: "#333",
    margin: 0,
  },
  transactionDetailText: {
    fontSize: 16,
    color: "#333",
    margin: 10,
  },
});

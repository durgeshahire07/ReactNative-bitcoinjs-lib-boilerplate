import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import walletStore from "../../../store/wallet/walletStore";

const WalletComponent = ({ walletFetch }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSendFundPress = () => {
    navigation.navigate("SendFundScreen");
  };

  const handleRemoveWallet = async () => {
    const walletRemoved = await walletStore.removeWallet(
      walletStore.activeWallet
    );
    if (walletRemoved) {
      walletFetch((prev) => !prev);
    } else {
      Alert.alert("Error", "Something went wrong");
    }
  };

  useEffect(() => {
    // Your additional setup logic if needed
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.walletContainer}>
        <Text style={styles.headerText}>
          {walletStore.activeWallet} Wallet
        </Text>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Wallet Balance</Text>
          <Text style={styles.balanceAmount}>{walletStore.balance}</Text>
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Wallet Address:</Text>
          <Text style={styles.addressText}>{walletStore.address}</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSendFundPress} style={styles.button}>
            <AntDesign name="arrowup" size={30} color="#4ba3eb" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Send</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <MaterialIcons name="history" size={30} color="#4ba3eb" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>History</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleRemoveWallet} style={styles.button}>
            <MaterialIcons name="delete" size={30} color="#f37a7a" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Remove</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  walletContainer: {
    width: "100%",
    height: 300,
    borderRadius: 20,
    backgroundColor: "#3498db",
    overflow: "hidden",
    padding: 20,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
  balanceContainer: {
    alignItems: "center",
  },
  balanceLabel: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  balanceAmount: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addressContainer: {},
  addressLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addressText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  buttonContainer: {
    textAlign: "center",
    alignItems: "center",
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // For Android
  },
  buttonText: {
    color: "#696969",
    marginTop: 10,
    fontSize: 14,
  },
});

export default WalletComponent;

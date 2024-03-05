import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import walletStore from "../../../store/wallet/walletStore";
import cryptoStore from "../../../store/crypto/cryptoStore";
import { BITCOIN, POLYGON } from "../../../constants/commonConstants";
import { Foundation } from "@expo/vector-icons";

const CurrencyPrice = () => {
  const [cryptoValue, setCryptoValue] = useState("--");
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchCryptoVal = async () => {
    try {
      let res = await cryptoStore.fetchValue();
      if (res) {
        setCryptoValue(cryptoStore.value);
        setLastUpdate(new Date().toLocaleTimeString());
      } else {
        // Handle error case
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchCryptoVal();
  };

  useEffect(() => {
    setLoading(true);
    fetchCryptoVal();
  }, [walletStore.activeWallet]);

  return (
    <View style={styles.container}>
      {walletStore.activeWallet === BITCOIN && (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/images/bitcoin.png")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.currencyText}>Bitcoin (BTC)</Text>
        </>
      )}
      {walletStore.activeWallet === POLYGON && (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/images/polygon.png")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.currencyText}>USDT</Text>
        </>
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <>
          <View style={styles.rowContainer}>
            <Text style={styles.currentValue}>
              {cryptoStore.value
                ? `$${parseFloat(cryptoValue).toFixed(2)}`
                : "--"}
            </Text>
            <TouchableOpacity onPress={handleRefresh}>
              <Foundation name="refresh" size={20} color="#000000a2" />
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.lastUpdateText}>Last update:</Text>
            <Text style={styles.lastUpdateText}>{lastUpdate || "--"}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  imageContainer: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  currencyText: {
    marginTop: 10,
    fontSize: 18,
    textAlign: "center",
  },
  currentValue: {
    margin: 0,
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  lastUpdateText: {
    fontSize: 14,
    textAlign: "center",
    marginRight: 5,
    color: "grey",
  },
});

export default CurrencyPrice;

import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, Button } from "react-native";
import styled from "styled-components/native";
import walletStore from "../../../store/wallet/walletStore";
import cryptoStore from "../../../store/crypto/cryptoStore"
import { BITCOIN, POLYGON } from "../../../constants/commonConstants";
import { Foundation } from "@expo/vector-icons";

const CurrencyPrice = () => {
  const [cryptoValue, setCryptoValue] = useState('--');
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchCryptoVal = async () => {
    try {
      let res = await cryptoStore.fetchValue();
      if (res) {
        setCryptoValue(cryptoStore.value);
        setLastUpdate(new Date().toLocaleTimeString());
      }
      else {

      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    setLoading(true);
    fetchCryptoVal();
  }

  useEffect(() => {
    setLoading(true);
    fetchCryptoVal();
  }, [walletStore.activeWallet]);


  return (
    <Container>
      {walletStore.activeWallet === BITCOIN && (
        <>
          <ImageContainer>
            <Image source={require('../../../assets/images/bitcoin.png')} resizeMode="cover" />
          </ImageContainer>
          <CurrencyText>Bitcoin (BTC)</CurrencyText>
        </>
      )}
      {walletStore.activeWallet === POLYGON && (
        <>
          <ImageContainer>
            <Image source={require('../../../assets/images/polygon.png')} resizeMode="cover" />
          </ImageContainer>
          <CurrencyText>USDT</CurrencyText>
        </>
      )}
      {
        loading ?
          <ActivityIndicator size="large" color="#203e94" />
          :
          <>
            <RowContainer>
              <CurrentValue>{
                cryptoStore.value ?
                  `$${parseFloat(cryptoValue).toFixed(2)}`
                  :
                  '--'
              }</CurrentValue>
              <Foundation onPress={handleRefresh} name="refresh" size={20} color="#000000a2" />
            </RowContainer>
            <RowContainer>
              <LastUpdateText>Last update:</LastUpdateText>
              <LastUpdateText>{lastUpdate || '--'}</LastUpdateText>
            </RowContainer>
          </>
      }

    </Container>
  );
};

export default CurrencyPrice;

const Container = styled.View`
  /* flex: 1;n */
  margin: 0px 0px 50px 0px;
`;

const ImageContainer = styled.View`
  width: 60px; 
  height: 60px; 
  align-items: center;
  justify-content: center;
  margin: 0 auto; 
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const CurrencyText = styled.Text`
  margin-top: 10px;
  font-size: 18px;
  text-align: center;
`;

const CurrentValue = styled.Text`
  margin: 0px 15px 0px 0px;
  font-size: 26px;
  text-align: center;
  font-weight: bold;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const LastUpdateText = styled.Text`
  font-size: 14px;
  text-align: center;
  margin-right: 5px;
  color: grey;
`;
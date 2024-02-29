import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import walletStore from "../../../store/walletStore";
import { BITCOIN, POLYGON } from "../../../constants/commonConstants";

const CurrencyPrice = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await walletStore.fetchCryptoPrices(walletStore);
      if (walletStore.selectedCryptoPrice) {
        setLoading(false);
      }
    };

    fetchData();
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
            <Image source={require('../../../assets/images/usdt.png')} resizeMode="cover" />
          </ImageContainer>
          <CurrencyText>USDT</CurrencyText>
        </>
      )}
      {
        !walletStore.selectedCryptoPrice || loading ?
          <ActivityIndicator size="large" color="#203e94" />
          :
          <CurrentValue>${parseFloat(walletStore.selectedCryptoPrice).toFixed(2)}</CurrentValue>
      }
    </Container>
  );
};

export default CurrencyPrice;

// Rest of the component remains the same


const Container = styled.View`
  flex: 1;
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
  margin-top: 10px;
  font-size: 24px;
  text-align: center;
  font-weight: bold;
`;


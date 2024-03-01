import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const WalletComponent = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {

    }, [])

    return (
        <Container>
            <HeaderText>Bitcoin Wallet</HeaderText>

            <BalanceContainer>
                <BalanceLabel>Wallet Balance</BalanceLabel>
                <BalanceAmount>$0.001 BTC</BalanceAmount>
            </BalanceContainer>

            <AddressText>Wallet Address - 0x32122313...</AddressText>
        </Container>
    );
};

const Container = styled.View`
  width: 90%;
  height: 250px; 
  border-radius: 20px;
  background-color: #3498db;
  overflow: hidden; 
  padding: 20px; 
  align-self: center;
  justify-content: space-between; 
`;

const HeaderText = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
`;

const BalanceContainer = styled.View`
  align-items: center; 
`;

const BalanceLabel = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
`;

const BalanceAmount = styled.Text`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const AddressText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export default WalletComponent;

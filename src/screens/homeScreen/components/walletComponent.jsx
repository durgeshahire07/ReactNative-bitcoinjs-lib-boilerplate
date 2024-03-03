import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import walletStore from "../../../store/wallet/walletStore";

const WalletComponent = ({ walletFetch }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSendFundPress = () => {
    navigation.navigate("SendFunds")
  }

  const handleRemoveWallet = async () => {
    const walletRemoved = await walletStore.removeWallet(walletStore.activeWallet);
    if (walletRemoved) {
      walletFetch((prev) => !prev)
    }
    else {
      Alert.alert("Seomthing went wrong")
    }
  }

  useEffect(() => {
    // console.log(walletStore.balance)
    // Your additional setup logic if needed
  }, []);

  return (
    <Container>
      <WalletContainer>
        <HeaderText>{walletStore.activeWallet} Wallet</HeaderText>

        <BalanceContainer>
          <BalanceLabel>Wallet Balance</BalanceLabel>
          <BalanceAmount>{walletStore.balance}</BalanceAmount>
        </BalanceContainer>

        <AddressContainer>
          <AddressLabel>Wallet Address:</AddressLabel>
          <AddressText>{walletStore.address}</AddressText>
        </AddressContainer>

      </WalletContainer>

      <ButtonRow>
        <ButtonContainer>
          <Button onPress={handleSendFundPress}>
            <AntDesign name="arrowup" size={30} color="#4ba3eb" />
          </Button>
          <ButtonText>Send</ButtonText>

        </ButtonContainer>
        <ButtonContainer>
          <Button>
            <MaterialIcons name="history" size={30} color="#4ba3eb" />
          </Button>
          <ButtonText>History</ButtonText>

        </ButtonContainer>
        <ButtonContainer>
          <Button onPress={handleRemoveWallet}>
            <MaterialIcons name="delete" size={30} color="#f37a7a" />
          </Button>
          <ButtonText>Remove</ButtonText>
        </ButtonContainer>

      </ButtonRow>
    </Container>
  );
};
//if no styles to be given then add React.Fragments later
const Container = styled.View`
flex: 1;
/* align-items: center; */
`

const WalletContainer = styled.View`
  width: 100%;
  height: 300px;
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

const AddressContainer = styled.View`
  
`

const AddressLabel = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;
  /* width: 100%; */
`;

const ButtonContainer = styled.View`
  text-align: center;
  align-items: center;
`
const Button = styled(TouchableOpacity)`
  width: 80px;
  height: 80px;
  border-radius: 15px;
  background-color: #fff;
  align-items: center;
  justify-content: center;

  /* For Android */
  elevation: 5;
`;

const ButtonText = styled.Text`
  color: #696969;
  margin-top: 10px;
  font-size: 14px;
`;

export default WalletComponent;

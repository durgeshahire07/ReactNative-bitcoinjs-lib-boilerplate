import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import walletStore from "../../../store/wallet/walletStore";
import TabContainer from "../../../components/tabContainer";
import { BITCOIN, POLYGON } from "../../../constants/commonConstants";

const WalletOperations = () => {

    return (
        <Container>    
            <Text>selected wallet is: polygon</Text>
        </Container>
    );
};

export default WalletOperations;

const Container = styled.View`
  flex: 1;
  padding: 0px 20px;
`;


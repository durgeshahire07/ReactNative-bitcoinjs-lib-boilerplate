import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/homeScreen";
import SendFunds from "../screens/sendFundScreen";
import TransactionDetailScreen from "../screens/txDetailScreen";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "CryptoWallet",
        }}
      />
      <Stack.Screen
        name="SendFundScreen"
        component={SendFunds}
        options={{
          headerTitle: "Send Funds",
        }}
      />
      <Stack.Screen
        name="TransactionDetailScreen"
        component={TransactionDetailScreen}
        options={{
          headerTitle: "Transaction Details",
        }}
      />
      {/* Add other routes as needed */}
    </Stack.Navigator>
  );
};

export default Routes;

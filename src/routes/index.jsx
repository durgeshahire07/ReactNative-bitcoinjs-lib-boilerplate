import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/homeScreen";
import SendFunds from "../screens/sendFunds";

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
        name="SendFunds"
        component={SendFunds}
        options={{
          headerTitle: "Send Funds",
        }}
      />
      {/* Add other routes as needed */}
    </Stack.Navigator>
  );
};

export default Routes;

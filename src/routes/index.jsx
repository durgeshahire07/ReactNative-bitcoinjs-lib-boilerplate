import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/homeScreen";
import SendFunds from "../screens/sendFundScreen";
import TransactionDetailScreen from "../screens/txDetailScreen";
import { 
  HOME_SCREEN, 
  TRANSACTION_DETAILS_SCREEN, 
  SEND_FUNDS_SCREEN,
  HOME_HEADER,
  SEND_FUNDS_HEADER,
  TRANSACTION_DETAILS_HEADER
} from "../constants/commonConstants";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName={HOME_SCREEN}>
      <Stack.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{
          headerTitle: HOME_HEADER,
        }}
      />
      <Stack.Screen
        name={SEND_FUNDS_SCREEN}
        component={SendFunds}
        options={{
          headerTitle: SEND_FUNDS_HEADER,
        }}
      />
      <Stack.Screen
        name={TRANSACTION_DETAILS_SCREEN}
        component={TransactionDetailScreen}
        options={{
          headerTitle: TRANSACTION_DETAILS_HEADER,
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;

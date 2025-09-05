//src/navigation/index.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoneyMultiplierScreen from '../screens/MoneyMultiplierScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Money" component={MoneyMultiplierScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

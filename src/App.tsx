import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootTabs from './navigation';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <RootTabs />
    </NavigationContainer>
  );
}

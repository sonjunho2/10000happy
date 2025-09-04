//src/App.tsx
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './navigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
}

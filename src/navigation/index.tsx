import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ChatScreen from '../screens/ChatScreen';
import DreamsScreen from '../screens/DreamsScreen';
import SuccessScreen from '../screens/SuccessScreen';
import AlertsScreen from '../screens/AlertsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chats" component={ChatsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function RootTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarLabelStyle: { fontSize: 12 } }}>
      <Tab.Screen name="홈" component={HomeScreen} options={{ tabBarIcon: () => <Text>🏠</Text> }} />
      <Tab.Screen name="채팅" component={ChatStack} options={{ tabBarIcon: () => <Text>💬</Text> }} />
      <Tab.Screen name="꿈" component={DreamsScreen} options={{ tabBarIcon: () => <Text>⭐</Text> }} />
      <Tab.Screen name="성공" component={SuccessScreen} options={{ tabBarIcon: () => <Text>✅</Text> }} />
      <Tab.Screen name="알림" component={AlertsScreen} options={{ tabBarIcon: () => <Text>🔔</Text> }} />
      <Tab.Screen name="프로필" component={ProfileScreen} options={{ tabBarIcon: () => <Text>👤</Text> }} />
    </Tab.Navigator>
  );
}

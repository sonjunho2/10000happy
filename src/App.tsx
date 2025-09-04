import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from './FeedScreen';
import NewPostScreen from './NewPostScreen';
import PostScreen from './PostScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen name="게시판" component={FeedScreen} />
      <Tab.Screen name="글쓰기" component={NewPostScreen} />
      <Tab.Screen name="프로필" component={() => null} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="홈" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="게시글" component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

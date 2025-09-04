import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// --- 최소 더미 스크린 (프로젝트에 같은 이름의 파일이 이미 있으면 유지해도 됨) ---
function HomeScreen() { return <Centered title="홈" desc="만원의행복 시작 화면" />; }
function ChatsScreen() { return <Centered title="채팅" desc="대화 목록" />; }
function ChatScreen() { return <Centered title="대화" desc="1:1 채팅" />; }
function DreamsScreen() { return <Centered title="꿈" desc="꿈 등록/관리" />; }
function AlertsScreen() { return <Centered title="알림" desc="푸시/이벤트 알림" />; }
function SuccessScreen() { return <Centered title="성공사례" desc="후기/사례" />; }
function ProfileScreen() { return <Centered title="프로필" desc="내 정보" />; }

function Centered({ title, desc }: { title: string; desc: string }) {
  return (
    <View style={s.wrap}>
      <Text style={s.title}>{title}</Text>
      <Text style={s.desc}>{desc}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: true }}>
        <Tab.Screen name="홈" component={HomeScreen} />
        <Tab.Screen name="채팅" component={ChatsScreen} />
        <Tab.Screen name="꿈" component={DreamsScreen} />
        <Tab.Screen name="알림" component={AlertsScreen} />
        <Tab.Screen name="성공" component={SuccessScreen} />
        <Tab.Screen name="프로필" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '700' },
  desc: { marginTop: 8, fontSize: 16, color: '#666' }
});

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import KakaoHeader from '../components/KakaoHeader';
import { fetchChats } from '../api/endpoints';
import { colors } from '../theme/colors';

export default function ChatsScreen({ navigation }: any) {
  const [chats, setChats] = useState<any[]>([]);
  useEffect(() => { (async () => setChats(await fetchChats()))(); }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.grayBg }}>
      <KakaoHeader title="채팅" />
      <FlatList
        contentContainerStyle={{ padding: 8 }}
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Chat', { id: item.id, name: item.name })}>
            <View style={styles.avatar}><Text>😊</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.msg} numberOfLines={1}>{item.lastMessage}</Text>
            </View>
            {item.unread > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{item.unread}</Text></View>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: 'white', marginVertical: 6, borderRadius: 12, gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFF3B0', alignItems: 'center', justifyContent: 'center' },
  name: { fontWeight: 'bold', marginBottom: 4 },
  msg: { color: '#666' },
  badge: { backgroundColor: '#FF4D4F', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { color: 'white', fontWeight: 'bold' },
});

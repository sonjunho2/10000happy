import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, Text } from 'react-native';
import KakaoHeader from '../components/KakaoHeader';
import ChatBubble from '../components/ChatBubble';
import { fetchMessages, sendMessage } from '../api/endpoints';
import { colors } from '../theme/colors';

export default function ChatScreen({ route }: any) {
  const { id, name } = route.params;
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  useEffect(() => { (async () => setMessages(await fetchMessages(id)))(); }, [id]);

  const onSend = async () => {
    if (!text.trim()) return;
    const m = await sendMessage(id, text.trim());
    setMessages((prev) => [...prev, m]);
    setText('');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.grayBg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <KakaoHeader title={name} />
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatBubble text={item.text} mine={item.author === 'me'} />}
      />
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="메시지를 입력하세요" />
        <TouchableOpacity style={styles.send} onPress={onSend}><Text style={{ fontWeight: 'bold' }}>전송</Text></TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputRow: { flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: 'white' },
  input: { flex: 1, borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8 },
  send: { backgroundColor: colors.kakaoYellow, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
});

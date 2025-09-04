//src/screens/NewPostScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, Alert } from 'react-native';
import { createPost } from '../api/endpoints';
import { useNavigation } from '@react-navigation/native';

export default function NewPostScreen() {
  const nav = useNavigation<any>();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = async () => {
    if (!title.trim() || !body.trim()) return;
    await createPost({ title: title.trim(), body: body.trim(), author: '익명' });
    Alert.alert('등록 완료', '게시판으로 이동합니다.');
    nav.navigate('게시판');
  };

  return (
    <View style={s.wrap}>
      <TextInput placeholder="제목" placeholderTextColor="#9A9A9A" style={s.inputTitle} value={title} onChangeText={setTitle} />
      <TextInput placeholder="내용을 입력하세요" placeholderTextColor="#9A9A9A" style={s.inputBody} value={body} onChangeText={setBody} multiline />
      <Pressable style={s.submit} onPress={onSubmit}><Text style={{ color: '#111', fontWeight: '800' }}>등록</Text></Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#121212', padding: 16 },
  inputTitle: { backgroundColor: '#1C1C1E', color: '#fff', borderRadius: 10, padding: 12, fontSize: 16, fontWeight: '700' },
  inputBody: { backgroundColor: '#1C1C1E', color: '#fff', borderRadius: 10, padding: 12, fontSize: 15, marginTop: 10, minHeight: 200, textAlignVertical: 'top' },
  submit: { backgroundColor: '#FEE500', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 16 }
});

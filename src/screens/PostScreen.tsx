//src/screens/PostScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { getPost, addComment, Post, Comment, likePost } from '../api/endpoints';
import { useRoute } from '@react-navigation/native';

export default function PostScreen() {
  const route = useRoute<any>();
  const id = route.params?.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {
      const data = await getPost(id);
      setPost(data.post);
      setComments(data.comments);
    })();
  }, [id]);

  if (!post) return null;

  const onSend = async () => {
    if (!text.trim()) return;
    const c = await addComment(post.id, { body: text.trim(), author: '익명' });
    setComments((prev) => [c, ...prev]);
    setText('');
  };

  const onLike = async () => {
    const updated = await likePost(post.id);
    setPost(updated);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={{ flex: 1 }}>
      <View style={s.wrap}>
        <Text style={s.title}>{post.title}</Text>
        <Text style={s.meta}>{fmtMeta(post)}</Text>
        <Text style={s.body}>{post.body}</Text>

        <View style={s.actions}>
          <Pressable style={s.btn} onPress={onLike}><Text style={s.btnTxt}>👍 공감하기 {post.likes}</Text></Pressable>
          <Pressable style={[s.btn, { marginLeft: 10 }]}><Text style={s.btnTxt}>저장</Text></Pressable>
        </View>

        <Text style={s.section}>댓글 {comments.length}</Text>
        <FlatList
          data={comments}
          keyExtractor={(x) => String(x.id)}
          renderItem={({ item }) => (
            <View style={s.comment}>
              <Text style={s.cAuthor}>{item.author}</Text>
              <Text style={s.cBody}>{item.body}</Text>
              <Text style={s.cMeta}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          contentContainerStyle={{ paddingBottom: 90 }}
        />

        <View style={s.inputRow}>
          <TextInput
            placeholder="댓글 쓰기…"
            placeholderTextColor="#9A9A9A"
            value={text}
            onChangeText={setText}
            style={s.input}
          />
          <Pressable style={s.send} onPress={onSend}><Text style={{ color: '#111', fontWeight: '700' }}>등록</Text></Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#121212', padding: 16 },
  title: { color: '#fff', fontSize: 20, fontWeight: '800' },
  meta: { color: '#8A8A8E', marginTop: 6, fontSize: 12 },
  body: { color: '#E8E8E8', marginTop: 12, fontSize: 15, lineHeight: 22 },
  actions: { flexDirection: 'row', marginTop: 14, marginBottom: 6 },
  btn: { backgroundColor: '#2A2A2D', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  btnTxt: { color: '#fff', fontWeight: '700' },
  section: { color: '#fff', marginTop: 14, marginBottom: 8, fontWeight: '700' },
  comment: { backgroundColor: '#1C1C1E', borderRadius: 10, padding: 12 },
  cAuthor: { color: '#fff', fontWeight: '700', marginBottom: 4 },
  cBody: { color: '#E6E6E6' },
  cMeta: { color: '#8A8A8E', marginTop: 6, fontSize: 11 },
  inputRow: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C1E' },
  input: { flex: 1, backgroundColor: '#2A2A2D', color: '#fff', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8 },
  send: { backgroundColor: '#FEE500', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 }
});

function fmtMeta(p: Post) {
  return `작성 ${new Date(p.createdAt).toLocaleDateString()} • 👁️ ${p.views} • 💬 ${p.commentsCount} • 👍 ${p.likes}`;
}

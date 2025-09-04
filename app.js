//App.js
// ─────────────────────────────────────────────────────────────────────────────
// src/App (root)
import 'react-native-gesture-handler';
import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, Pressable, RefreshControl,
  TextInput, KeyboardAvoidingView, Platform, Alert
} from 'react-native';

// ─────────────────────────────────────────────────────────────────────────────
// src/navigation/index
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ─────────────────────────────────────────────────────────────────────────────
// src/config/env  (Snack에서는 백엔드 없이 목업 데이터 사용)
const ENV = { API_BASE_URL: '' };

// ─────────────────────────────────────────────────────────────────────────────
// src/api/client
async function http(path, opts) {
  if (!ENV.API_BASE_URL) throw new Error('NO_BACKEND');
  const r = await fetch(ENV.API_BASE_URL.replace(/\/$/, '') + path, {
    headers: { 'Content-Type': 'application/json', ...(opts?.headers || {}) },
    ...opts
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}
const client = {
  get: (p) => http(p),
  post: (p, body) => http(p, { method: 'POST', body: JSON.stringify(body) })
};

// ─────────────────────────────────────────────────────────────────────────────
// src/api/mock/data
const now = () => new Date().toISOString();
const rid = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;
const MOCK = {
  posts: [
    { id: 'p1', title: '심심할 때 만나서 같이 노실 분~~~🐥', body: '동네친구처럼 카페/보드게임/야구장 등 같이 놀아요!', author: '율이', createdAt: now(), views: 224, likes: 2, commentsCount: 1 },
    { id: 'p2', title: '성인 영어회화 배워본 적 있으신분 계실까요ㅎㅎ', body: '40대지만 버킷리스트라 꼭 도전!', author: '두암1동', createdAt: now(), views: 19, likes: 0, commentsCount: 0 }
  ],
  comments: [
    { id: rid(), postId: 'p1', body: '저도 보드게임 좋아해요!', author: '익명', createdAt: now() }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// src/api/endpoints
async function listPosts() {
  try {
    const data = await client.get('/posts');
    return data.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  } catch {
    const posts = MOCK.posts.map(p => ({
      ...p,
      commentsCount: MOCK.comments.filter(c => c.postId === p.id).length
    }));
    return posts.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }
}
async function getPost(id) {
  try {
    const post = await client.get(`/posts/${id}`);
    const comments = await client.get(`/posts/${id}/comments`);
    return { post, comments };
  } catch {
    const post = MOCK.posts.find(p => p.id === id);
    const comments = MOCK.comments
      .filter(c => c.postId === id)
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return { post, comments };
  }
}
async function createPost(input) {
  try {
    return await client.post('/posts', input);
  } catch {
    const p = { id: rid(), title: input.title, body: input.body, author: input.author, createdAt: now(), views: 0, likes: 0, commentsCount: 0 };
    MOCK.posts.unshift(p);
    return p;
  }
}
async function addComment(postId, input) {
  try {
    return await client.post(`/posts/${postId}/comments`, input);
  } catch {
    const c = { id: rid(), postId, body: input.body, author: input.author, createdAt: now() };
    MOCK.comments.unshift(c);
    const idx = MOCK.posts.findIndex(p => p.id === postId);
    if (idx >= 0) MOCK.posts[idx].commentsCount += 1;
    return c;
  }
}
async function likePost(postId) {
  try {
    return await client.post(`/posts/${postId}/like`, {});
  } catch {
    const p = MOCK.posts.find(x => x.id === postId);
    p.likes += 1;
    return { ...p };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// src/screens/FeedScreen
function FeedScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try { setItems(await listPosts()); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const Item = ({ p }) => (
    <Pressable style={styles.card} onPress={() => navigation.navigate('게시글', { id: p.id })}>
      <Text style={styles.title} numberOfLines={1}>{p.title}</Text>
      <Text style={styles.body} numberOfLines={1}>{p.body}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>{timeAgo(p.createdAt)}</Text>
        <View style={{ flex: 1 }} />
        <Text style={styles.meta}>👍 {p.likes}</Text>
        <Text style={[styles.meta, { marginLeft: 12 }]}>💬 {p.commentsCount}</Text>
        <Text style={[styles.meta, { marginLeft: 12 }]}>👁️ {p.views}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.wrap}>
      <FlatList
        data={items}
        keyExtractor={(x) => String(x.id)}
        renderItem={({ item }) => <Item p={item} />}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// src/screens/PostScreen
function PostScreen({ route }) {
  const id = route.params?.id;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
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
    setComments(prev => [c, ...prev]);
    setText('');
  };

  const onLike = async () => {
    const updated = await likePost(post.id);
    setPost(updated);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={{ flex: 1 }}>
      <View style={styles.wrap}>
        <Text style={styles.detailTitle}>{post.title}</Text>
        <Text style={styles.meta}>{fmtMeta(post)}</Text>
        <Text style={styles.detailBody}>{post.body}</Text>

        <View style={styles.actions}>
          <Pressable style={styles.btn} onPress={onLike}><Text style={styles.btnTxt}>👍 공감하기 {post.likes}</Text></Pressable>
          <Pressable style={[styles.btn, { marginLeft: 10 }]}><Text style={styles.btnTxt}>저장</Text></Pressable>
        </View>

        <Text style={styles.section}>댓글 {comments.length}</Text>
        <FlatList
          data={comments}
          keyExtractor={(x) => String(x.id)}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Text style={styles.cAuthor}>{item.author}</Text>
              <Text style={styles.cBody}>{item.body}</Text>
              <Text style={styles.cMeta}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          contentContainerStyle={{ paddingBottom: 90 }}
        />

        <View style={styles.inputRow}>
          <TextInput
            placeholder="댓글 쓰기…"
            placeholderTextColor="#9A9A9A"
            value={text}
            onChangeText={setText}
            style={styles.input}
          />
          <Pressable style={styles.send} onPress={onSend}><Text style={{ color: '#111', fontWeight: '700' }}>등록</Text></Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// src/screens/NewPostScreen
function NewPostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = async () => {
    if (!title.trim() || !body.trim()) return;
    await createPost({ title: title.trim(), body: body.trim(), author: '익명' });
    Alert.alert('등록 완료', '게시판으로 이동합니다.');
    navigation.navigate('게시판');
  };

  return (
    <View style={styles.wrap}>
      <TextInput placeholder="제목" placeholderTextColor="#9A9A9A" style={styles.inputTitle} value={title} onChangeText={setTitle} />
      <TextInput placeholder="내용을 입력하세요" placeholderTextColor="#9A9A9A" style={styles.inputBody} value={body} onChangeText={setBody} multiline />
      <Pressable style={styles.submit} onPress={onSubmit}><Text style={{ color: '#111', fontWeight: '800' }}>등록</Text></Pressable>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// src/screens/ProfileScreen (placeholder)
function ProfileScreen() {
  return <View style={[styles.wrap, { alignItems: 'center', justifyContent: 'center' }]}><Text style={{ color: '#fff' }}>프로필 준비중</Text></View>;
}

// ─────────────────────────────────────────────────────────────────────────────
// src/navigation/Tabs + Stack
function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen name="게시판" component={FeedScreen} />
      <Tab.Screen name="글쓰기" component={NewPostScreen} />
      <Tab.Screen name="프로필" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="홈" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="게시글" component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// src/App export
export default function App() {
  return <Navigation />;
}

// ─────────────────────────────────────────────────────────────────────────────
// styles (common)
const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#121212', padding: 16 },
  // Feed
  card: { backgroundColor: '#1C1C1E', borderRadius: 12, padding: 14 },
  title: { color: '#fff', fontSize: 16, fontWeight: '700' },
  body: { color: '#B0B0B0', fontSize: 13, marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  meta: { color: '#8A8A8E', fontSize: 12 },
  sep: { height: 10 },
  // Post
  detailTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  detailBody: { color: '#E8E8E8', marginTop: 12, fontSize: 15, lineHeight: 22 },
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
  send: { backgroundColor: '#FEE500', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  // NewPost
  inputTitle: { backgroundColor: '#1C1C1E', color: '#fff', borderRadius: 10, padding: 12, fontSize: 16, fontWeight: '700' },
  inputBody: { backgroundColor: '#1C1C1E', color: '#fff', borderRadius: 10, padding: 12, fontSize: 15, marginTop: 10, minHeight: 200, textAlignVertical: 'top' },
  submit: { backgroundColor: '#FEE500', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 16 }
});

// ─────────────────────────────────────────────────────────────────────────────
// utils
function timeAgo(iso) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return `${s}s 전`;
  const m = Math.floor(s / 60); if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60); if (h < 24) return `${h}시간 전`;
  const d = Math.floor(h / 24); return `${d}일 전`;
}

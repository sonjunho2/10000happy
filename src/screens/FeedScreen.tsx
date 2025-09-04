//src/screens/FeedScreen.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, RefreshControl } from 'react-native';
import { listPosts, Post } from '../api/endpoints';
import { useNavigation } from '@react-navigation/native';

export default function FeedScreen() {
  const nav = useNavigation<any>();
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try { setItems(await listPosts()); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const Item = ({ p }: { p: Post }) => (
    <Pressable style={s.card} onPress={() => nav.navigate('게시글', { id: p.id })}>
      <Text style={s.title} numberOfLines={1}>{p.title}</Text>
      <Text style={s.body} numberOfLines={1}>{p.body}</Text>
      <View style={s.metaRow}>
        <Text style={s.meta}>{timeAgo(p.createdAt)}</Text>
        <View style={{ flex: 1 }} />
        <Text style={s.meta}>👍 {p.likes}</Text>
        <Text style={[s.meta, { marginLeft: 12 }]}>💬 {p.commentsCount}</Text>
        <Text style={[s.meta, { marginLeft: 12 }]}>👁️ {p.views}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={s.wrap}>
      <FlatList
        data={items}
        keyExtractor={(x) => String(x.id)}
        renderItem={({ item }) => <Item p={item} />}
        ItemSeparatorComponent={() => <View style={s.sep} />}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#121212', paddingHorizontal: 12 },
  card: { backgroundColor: '#1C1C1E', borderRadius: 12, padding: 14 },
  title: { color: '#fff', fontSize: 16, fontWeight: '700' },
  body: { color: '#B0B0B0', fontSize: 13, marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  meta: { color: '#8A8A8E', fontSize: 12 },
  sep: { height: 10 }
});

function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return `${s}s 전`;
  const m = Math.floor(s / 60); if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60); if (h < 24) return `${h}시간 전`;
  const d = Math.floor(h / 24); return `${d}일 전`;
}

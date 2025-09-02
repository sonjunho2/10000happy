import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import KakaoHeader from '../components/KakaoHeader';
import { fetchDreams } from '../api/endpoints';
import ProgressBar from '../components/ProgressBar';
import { colors } from '../theme/colors';

export default function DreamsScreen() {
  const [dreams, setDreams] = useState<any[]>([]);
  useEffect(() => { (async () => setDreams(await fetchDreams()))(); }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.grayBg }}>
      <KakaoHeader title="실현된 꿈 / 목표" />
      <FlatList
        contentContainerStyle={{ padding: 16, gap: 12 }}
        data={dreams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const percent = Math.round((item.current / item.goal) * 100);
          return (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <ProgressBar value={percent} />
              <Text style={styles.progressText}>
                {item.current.toLocaleString()} P / {item.goal.toLocaleString()} P ({percent}%)
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', borderRadius: 16, padding: 16, gap: 8 },
  title: { fontWeight: 'bold', fontSize: 16 },
  progressText: { color: '#666' },
});

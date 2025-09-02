import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import KakaoHeader from '../components/KakaoHeader';
import PointCard from '../components/PointCard';
import ProgressBar from '../components/ProgressBar';
import { fetchUser, fetchDreams } from '../api/endpoints';
import { colors } from '../theme/colors';

export default function HomeScreen({ navigation }: any) {
  const [point, setPoint] = useState(0);
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      const user = await fetchUser();
      setPoint(user.point);
      const dreams = await fetchDreams();
      if (dreams.length > 0) {
        setTitle(dreams[0].title);
        setProgress(Math.round((dreams[0].current / dreams[0].goal) * 100));
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.grayBg }}>
      <KakaoHeader title="AIDER" />
      <ScrollView contentContainerStyle={styles.container}>
        <PointCard point={point} />
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>오늘의 목표</Text>
          <Text style={styles.goal}>{title || '나의 목표를 추가하세요'}</Text>
          <ProgressBar value={progress} />
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate('꿈')}>
          <Text style={styles.ctaText}>1만원으로 시작하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 16, gap: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold' },
  goal: { color: '#444' },
  progressText: { color: '#666' },
  cta: { backgroundColor: colors.kakaoYellow, padding: 16, borderRadius: 24, alignItems: 'center', marginTop: 8 },
  ctaText: { fontWeight: 'bold', color: colors.black, fontSize: 16 },
});

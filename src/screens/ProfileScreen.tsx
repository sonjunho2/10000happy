import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import KakaoHeader from '../components/KakaoHeader';
import { fetchUser } from '../api/endpoints';
import { colors } from '../theme/colors';

export default function ProfileScreen() {
  const [nickname, setNickname] = useState('');
  const [point, setPoint] = useState(0);

  useEffect(() => {
    (async () => {
      const u = await fetchUser();
      setNickname(u.nickname);
      setPoint(u.point);
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.grayBg }}>
      <KakaoHeader title="프로필" />
      <View style={styles.body}>
        <Text style={styles.name}>{nickname} 님</Text>
        <Text style={styles.pt}>보유 포인트: {point.toLocaleString()} P</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  body: { padding: 16 },
  name: { fontWeight: 'bold', fontSize: 20, marginBottom: 8 },
  pt: { color: '#666' },
});

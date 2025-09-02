import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import KakaoHeader from '../components/KakaoHeader';
import { colors } from '../theme/colors';

export default function AlertsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.grayBg }}>
      <KakaoHeader title="알림" />
      <View style={styles.body}><Text>알림이 없습니다.</Text></View>
    </View>
  );
}
const styles = StyleSheet.create({ body: { padding: 16 } });

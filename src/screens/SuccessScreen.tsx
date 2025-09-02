import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import KakaoHeader from '../components/KakaoHeader';
import { colors } from '../theme/colors';

export default function SuccessScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.grayBg }}>
      <KakaoHeader title="성공 후기" />
      <View style={styles.body}><Text>성공 후기 리스트 (더미)</Text></View>
    </View>
  );
}
const styles = StyleSheet.create({ body: { padding: 16 } });

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function PointCard({ point }: { point: number }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>내가 받은 총 POINT</Text>
      <Text style={styles.point}>{point.toLocaleString()} P</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  title: { color: colors.secondaryText, marginBottom: 8 },
  point: { fontSize: 28, fontWeight: 'bold', color: colors.primaryText },
});

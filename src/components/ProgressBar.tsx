import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function ProgressBar({ value }: { value: number }) {
  return (
    <View style={styles.wrap}>
      <View style={[styles.fill, { width: `${Math.max(0, Math.min(100, value))}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { height: 10, backgroundColor: '#E9E9E9', borderRadius: 5, overflow: 'hidden' },
  fill: { height: 10, backgroundColor: colors.green },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function ChatBubble({ text, mine }: { text: string; mine?: boolean }) {
  return (
    <View style={[styles.row, mine ? styles.rowMine : null]}>
      <View style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleOther]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginVertical: 6, justifyContent: 'flex-start' },
  rowMine: { justifyContent: 'flex-end' },
  bubble: { maxWidth: '80%', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12 },
  bubbleMine: { backgroundColor: colors.kakaoYellow, alignSelf: 'flex-end' },
  bubbleOther: { backgroundColor: '#EFEFEF' },
  text: { color: colors.black, fontSize: 16 },
});

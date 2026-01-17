import { Redirect } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useColors } from '@/hooks/use-colors';

export default function Index() {
  const colors = useColors();

  // Stack.Protected handles auth routing - just redirect to app group
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Redirect href="/(app)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

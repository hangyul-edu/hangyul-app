import { View, Text } from "@/src/tw";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-8">
      <Text className="text-h3 text-black-900">h3 토큰</Text>
      <Text className="text-b5 text-negative">b5 토큰</Text>
      <Text className="text-c2 text-brand-teal">c2 토큰</Text>
    </View>
  );
}

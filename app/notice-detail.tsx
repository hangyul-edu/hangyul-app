import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "@/src/tw";
import { TopNav } from "@/src/components/TopNav";

export default function NoticeDetailScreen() {
  const { title, date, content } = useLocalSearchParams<{
    title: string;
    date: string;
    content: string;
  }>();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top"]}
    >
      <TopNav leftIcon="back" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        {/* 제목 */}
        <Text className="text-b4 text-black-800 mt-4">{title}</Text>

        {/* 날짜 */}
        <Text className="text-c3 text-black-600 mt-2">{date}</Text>

        {/* 구분선 */}
        <View className="h-px bg-black-200 my-4" />

        {/* 본문 */}
        <Text className="text-b8 text-black-700" style={{ lineHeight: 22 }}>
          {content}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

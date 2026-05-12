import { router } from "expo-router";
import { View, Text, Pressable } from "@/src/tw";

export default function CourseScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-8">
      <Pressable
        className="px-6 py-3 rounded-xl bg-primary-900"
        onPress={() => router.push("/set-language")}
      >
        <Text className="text-b6 text-white">초기 언어 설정 화면으로</Text>
      </Pressable>
      <Pressable
        className="px-6 py-3 rounded-xl bg-primary-900"
        onPress={() => router.push("/login")}
      >
        <Text className="text-b6 text-white">로그인 화면으로</Text>
      </Pressable>
      <Pressable
        className="px-6 py-3 rounded-xl bg-primary-900"
        onPress={() => router.push("/onboarding-intro")}
      >
        <Text className="text-b6 text-white">온보딩 화면으로</Text>
      </Pressable>
    </View>
  );
}

import { Link, Stack } from "expo-router";
import { View, Text } from "@/src/tw";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "찾을 수 없음" }} />
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-semibold text-gray-900">
          페이지를 찾을 수 없습니다
        </Text>
        <Link href="/" className="mt-4">
          <Text className="text-blue-500">홈으로 돌아가기</Text>
        </Link>
      </View>
    </>
  );
}

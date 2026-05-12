import { useTranslation } from "react-i18next";
import { View, Text } from "@/src/tw";

export default function SentenceScreen() {
  const { t } = useTranslation();
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-gray-900">{t("tabs.sentence")}</Text>
    </View>
  );
}

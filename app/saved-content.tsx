import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { TopNav } from "@/src/components/TopNav";
import { ContentListItem } from "@/src/components/ContentListItem";

interface SavedItem {
  id: string;
  unit: string;
  title: string;
}

const SAVED_ITEMS: SavedItem[] = [
  { id: "1", unit: "유닛 1", title: "인사 표현 배우기" },
  { id: "2", unit: "유닛 2", title: "자기소개하기" },
  { id: "3", unit: "유닛 3", title: "숫자와 나이 말하기" },
  { id: "4", unit: "유닛 4", title: "장소 말하기" },
  { id: "5", unit: "유닛 5", title: "날짜와 요일 말하기" },
  { id: "6", unit: "유닛 6", title: "취미 소개하기" },
  { id: "7", unit: "유닛 7", title: "오늘 일정 말하기" },
  { id: "8", unit: "유닛 8", title: "기분과 감정 표현하기" },
  { id: "9", unit: "유닛 9", title: "날씨 이야기하기" },
  { id: "10", unit: "유닛 10", title: "가족 소개하기" },
  { id: "11", unit: "유닛 11", title: "음식과 맛 표현하기" },
];

export default function SavedContentScreen() {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
      <TopNav leftIcon="back" title={t("savedContent.title")} />

      <FlatList
        data={SAVED_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContentListItem
            unit={item.unit}
            title={item.title}
            onPlay={() => {}}
            onDelete={() => {}}
          />
        )}
        contentContainerStyle={{ padding: 20, gap: 10, backgroundColor: "#FFF8F1" }}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#FFF8F1" }}
      />
    </SafeAreaView>
  );
}

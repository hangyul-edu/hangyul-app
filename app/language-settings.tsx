import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { View } from "@/src/tw";
import { TopNav } from "@/src/components/TopNav";
import { SelectList } from "@/src/components/SelectList";
import { Button } from "@/src/components/Button";

const LANGUAGES = [
  { id: "en", label: "English" },
  { id: "zh", label: "中文" },
  { id: "ja", label: "日本語" },
  { id: "es", label: "Español" },
  { id: "fr", label: "Français" },
  { id: "de", label: "Deutsch" },
  { id: "th", label: "ภาษาไทย" },
];

export default function LanguageSettingsScreen() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("en");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
      <TopNav leftIcon="back" title={t("languageSettings.title")} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        <SelectList
          options={LANGUAGES}
          value={selected}
          onChange={setSelected}
        />
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#FFFFFF" }}>
        <View className="px-5 pt-[10px] pb-4">
          <Button onPress={() => {}}>{t("common.save")}</Button>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

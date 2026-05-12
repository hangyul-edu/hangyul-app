import { useState } from "react";
import { Image, View as RNView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { View, Text } from "@/src/tw";
import { Button } from "@/src/components/Button";
import { SelectList, SelectOption } from "@/src/components/SelectList";
import { changeLanguage, type SupportedLanguage } from "@/src/i18n";

export default function SettingLanguageScreen() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState<SupportedLanguage | "">("");

  const LANGUAGE_OPTIONS: SelectOption[] = [
    { id: "en", label: t("setLanguage.options.english") },
    { id: "ko", label: t("setLanguage.options.korean") },
  ];

  const handleSelect = (id: string) => {
    setLanguage(id as SupportedLanguage);
  };

  const handleStart = async () => {
    if (!language) return;
    await changeLanguage(language);
    router.push("/login");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top", "bottom"]}
    >
      {/* 배경 데코 이미지 */}
      <RNView
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
        }}
      >
        {/* ㄹ — 우측 상단 */}
        <Image
          source={require("@/assets/images/deco_rieul.png")}
          style={{ position: "absolute", width: 167, height: 153, top: "18%", right: -27 }}
          resizeMode="contain"
        />
        {/* ㄱ — 좌측 중상단 */}
        <Image
          source={require("@/assets/images/deco_giyeok.png")}
          style={{ position: "absolute", width: 190, height: 190, top: "8%", left: -70 }}
          resizeMode="contain"
        />
        {/* ㅂ — 좌측 하단 */}
        <Image
          source={require("@/assets/images/deco_bieup.png")}
          style={{ position: "absolute", width: 147, height: 135, top: "58%", left: -11 }}
          resizeMode="contain"
        />
        {/* ㅇ — 우측 하단 */}
        <Image
          source={require("@/assets/images/deco_ieung.png")}
          style={{ position: "absolute", width: 180, height: 171, top: "60%", right: -30 }}
          resizeMode="contain"
        />
      </RNView>

      <View className="flex-1 justify-between px-5 py-8">
        {/* 상단: 제목 + 선택 목록 */}
        <View className="gap-16 mt-40">
          <Text className="text-black-800 text-h3 text-center">
            {t("setLanguage.title")}
          </Text>
          <SelectList
            options={LANGUAGE_OPTIONS}
            value={language}
            onChange={handleSelect}
          />
        </View>

        {/* 하단: 버튼 */}
        <Button disabled={!language} onPress={handleStart}>
          {t("setLanguage.cta")}
        </Button>
      </View>
    </SafeAreaView>
  );
}

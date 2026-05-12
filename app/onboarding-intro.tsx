import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { View, Text } from "@/src/tw";
import { Button } from "@/src/components/Button";

export default function OnboardingIntroScreen() {
  const { t } = useTranslation();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top", "bottom"]}
    >
      <View className="flex-1 items-center justify-between px-5 py-8">
        {/* 상단 텍스트 */}
        <View className="items-center gap-8 mt-24">
          <Text className="text-black-800 text-h3 text-center">
            {t("onboardingIntro.title")}
          </Text>
          <Text className="text-b6 text-black-700 text-center">
            {t("onboardingIntro.subtitle")}
          </Text>
          <Image
            source={require("@/assets/images/onboarding_intro.png")}
            style={{ width: 290, height: 180 }}
            resizeMode="contain"
          />
          <Text className="text-b6 text-black-700 text-center">
            {t("onboardingIntro.description")}
          </Text>
        </View>

        {/* 버튼 */}
        <View className="w-full gap-5">
          <Button onPress={() => router.push("/onboarding")}>
            {t("onboardingIntro.cta")}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

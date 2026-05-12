import { useState } from "react";
import { Image, ImageSourcePropType } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable } from "@/src/tw";
import { Button } from "@/src/components/Button";
import { SelectList, SelectOption } from "@/src/components/SelectList";
import { colors } from "@/src/constants/colors";
import ChevronLeft from "@/assets/icons/chevron_right.svg";

const TOTAL_STEPS = 3;

const MASCOT_IMAGES: {
  source: ImageSourcePropType;
  width: number;
  height: number;
  alignSelf: "center" | "flex-end";
}[] = [
  { source: require("@/assets/images/onboarding_1.png"), width: 140, height: 130, alignSelf: "center" },
  { source: require("@/assets/images/onboarding_2.png"), width: 150, height: 120, alignSelf: "flex-end" },
  { source: require("@/assets/images/onboarding_3.png"), width: 210, height: 90, alignSelf: "flex-end" },
];

function ProgressBar({ step }: { step: number }) {
  return (
    <View className="h-[5px] w-full bg-black-300 rounded-full overflow-hidden">
      <View
        className="h-full bg-primary-900 rounded-full"
        style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
      />
    </View>
  );
}

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [purpose, setPurpose] = useState("");
  const [level, setLevel] = useState("");
  const [daily, setDaily] = useState("");

  const purposeOptions: SelectOption[] = [
    { id: "conversation", label: t("onboarding.step1.options.conversation") },
    { id: "topik", label: t("onboarding.step1.options.topik") },
  ];

  const levelOptions: SelectOption[] = [
    { id: "beginner", label: t("onboarding.step2.options.beginner") },
    { id: "word", label: t("onboarding.step2.options.word") },
    { id: "simple", label: t("onboarding.step2.options.simple") },
    { id: "daily", label: t("onboarding.step2.options.daily") },
    { id: "fluent", label: t("onboarding.step2.options.fluent") },
  ];

  const dailyOptions: SelectOption[] = [
    { id: "5", label: t("onboarding.step3.options.five"), description: t("onboarding.step3.descriptions.five") },
    { id: "10", label: t("onboarding.step3.options.ten"), badge: t("onboarding.step3.badge.ten"), description: t("onboarding.step3.descriptions.ten") },
    { id: "20", label: t("onboarding.step3.options.twenty"), description: t("onboarding.step3.descriptions.twenty") },
    { id: "30", label: t("onboarding.step3.options.thirty"), description: t("onboarding.step3.descriptions.thirty") },
    { id: "40", label: t("onboarding.step3.options.forty"), description: t("onboarding.step3.descriptions.forty") },
  ];

  const canProceed =
    (step === 1 && !!purpose) ||
    (step === 2 && !!level) ||
    (step === 3 && !!daily);

  const isLastStep = step === TOTAL_STEPS;

  function handleNext() {
    if (isLastStep) {
      router.replace("/(tabs)" as any);
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (step === 1) {
      router.back();
    } else {
      setStep((s) => s - 1);
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top", "bottom"]}
    >
      <View className="px-5 pt-3 gap-5">
        <Pressable onPress={handleBack} className="self-start p-1">
          <ChevronLeft
            width={20}
            height={20}
            color={colors.black[800]}
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </Pressable>
        <ProgressBar step={step} />
      </View>

      <View className="flex-1 px-5 pt-12 justify-between pb-4">
        <View className="gap-12">
          {step === 1 && (
            <>
              <Text className="text-black-800 text-center" style={{ fontSize: 20, fontWeight: "700", lineHeight: 28 }}>
                {t("onboarding.step1.question")}
              </Text>
              <SelectList options={purposeOptions} value={purpose} onChange={setPurpose} />
            </>
          )}

          {step === 2 && (
            <>
              <Text className="text-black-800 text-center" style={{ fontSize: 20, fontWeight: "700", lineHeight: 28 }}>
                {t("onboarding.step2.question")}
              </Text>
              <SelectList options={levelOptions} value={level} onChange={setLevel} />
            </>
          )}

          {step === 3 && (
            <>
              <View className="gap-1">
                <Text className="text-c2 text-black-600 text-center">
                  {t("onboarding.step3.label")}
                </Text>
                <Text className="text-black-800 text-center" style={{ fontSize: 20, fontWeight: "700", lineHeight: 28 }}>
                  {t("onboarding.step3.question")}
                </Text>
              </View>
              <SelectList options={dailyOptions} value={daily} onChange={setDaily} />
            </>
          )}

          <Image
            source={MASCOT_IMAGES[step - 1].source}
            style={{
              width: MASCOT_IMAGES[step - 1].width,
              height: MASCOT_IMAGES[step - 1].height,
              alignSelf: MASCOT_IMAGES[step - 1].alignSelf,
            }}
            resizeMode="contain"
          />
        </View>

        <Button disabled={!canProceed} onPress={handleNext}>
          {isLastStep ? t("onboarding.cta.finish") : t("onboarding.cta.next")}
        </Button>
      </View>
    </SafeAreaView>
  );
}

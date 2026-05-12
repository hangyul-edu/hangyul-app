import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable, ScrollView } from "@/src/tw";
import { colors } from "@/src/constants/colors";
import { SubscriptionCard } from "@/src/components/SubscriptionCard";
import { TopNav } from "@/src/components/TopNav";
import ChevronRight from "@/assets/icons/chevron_right.svg";
import IcLevel from "@/assets/icons/ic_level.svg";
import IcStreakBest from "@/assets/icons/ic_streak_best.svg";
import IcStreakCurrent from "@/assets/icons/ic_streak_current.svg";

const hasNotification = true; // TODO: 실제 알림 상태로 교체

export default function MoreScreen() {
  const { t } = useTranslation();

  const MENU_ITEMS: { label: string; route?: string }[] = [
    { label: t("more.menu.savedContent"), route: "/saved-content" },
    { label: t("more.menu.accountManagement") },
    { label: t("more.menu.language"), route: "/language-settings" },
    { label: t("more.menu.announcements"), route: "/announcements" },
    { label: t("more.menu.faq") },
    { label: t("more.menu.contact") },
    { label: t("more.menu.notificationSettings"), route: "/notification-settings" },
    { label: t("more.menu.friendReferral") },
    { label: t("more.menu.termsAndPolicy") },
  ];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top"]}
    >
      <TopNav
        rightIcon="bell"
        hasNotification={hasNotification}
        onPressRight={() => router.push("/notifications")}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View
          className="mx-5 mt-2 rounded-2xl bg-white"
          style={{
            shadowColor: "rgba(77, 35, 57, 1)",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 36.8,
            elevation: 8,
          }}
        >
          <View className="items-center pt-4 pb-5 gap-2">
            {/* Avatar */}
            <Image
              source={require("@/assets/images/profile_default.png")}
              style={{ width: 48, height: 48 }}
              resizeMode="contain"
            />

            {/* Username + arrow */}
            <View className="flex-row items-center gap-1">
              <Text className="text-h7 text-black-800">lovely_like</Text>
              <ChevronRight color={colors.black[800]} width={16} height={16} />
            </View>

            {/* Bio */}
            <Text className="text-b6 text-black-600">
              "오늘도 한귤로 영어 한단계 성장 목표!"
            </Text>

            {/* Divider */}
            <View className="w-[90%] h-px my-1 bg-black-300" />

            {/* Stats */}
            <View className="flex-row w-full pb-1">
              <View className="flex-1 items-center gap-0.5 px-2">
                <IcLevel width={16} height={16} />
                <Text className="text-c4 text-black-700 opacity-70">
                  {t("more.profile.level")}
                </Text>
                <Text className="text-b6 text-black-800">학습레벨 4</Text>
              </View>

              <View className="w-px self-stretch bg-black-300" />

              <View className="flex-1 items-center gap-0.5 px-2">
                <IcStreakBest width={16} height={16} />
                <Text className="text-c4 text-black-700 opacity-70">
                  {t("more.profile.bestStreak")}
                </Text>
                <Text className="text-b6 text-black-800">00일</Text>
              </View>

              <View className="w-px self-stretch bg-black-300" />

              <View className="flex-1 items-center gap-0.5 px-2">
                <IcStreakCurrent width={16} height={16} />
                <Text
                  className="text-c4 text-black-700 opacity-70"
                  numberOfLines={1}
                >
                  {t("more.profile.currentStreak")}
                </Text>
                <Text className="text-b6 text-black-800">00일</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Subscription Card */}
        <SubscriptionCard
          className="mx-5 mt-4"
          status="free-trial"
          planName="첫 구독, 7일 무료 플랜"
          nextBillingDate="2025년 11월 29일"
          onPress={() => router.push("/subscription")}
        />

        {/* Menu List */}
        <View className="px-5 mt-8 gap-[20px]">
          {MENU_ITEMS.map(({ label, route }) => (
            <Pressable key={label} onPress={route ? () => router.push(route) : undefined}>
              <Text className="text-b6 text-black-800">{label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Footer */}
        <View className="px-5 mt-[34px] mb-8 gap-[20px]">
          <Pressable>
            <Text className="text-c2 text-black-500">{t("more.deleteAccount")}</Text>
          </Pressable>
          <Pressable>
            <Text className="text-c2 text-black-500">{t("more.menu.logout")}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

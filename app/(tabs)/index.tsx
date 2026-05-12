import { Image, View as RNView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { View, Text, Pressable, ScrollView } from "@/src/tw";
import { ProgressRing } from "@/src/components/ProgressRing";
import { QuickAccessCard } from "@/src/components/QuickAccessCard";
import { Button } from "@/src/components/Button";
import BellIcon from "@/assets/icons/bell.svg";
import ChevronRight from "@/assets/icons/chevron_right.svg";

// ── 스트릭 카드 ────────────────────────────────────
function StreakCard() {
  return (
    <View className="mx-5 mt-3" style={{ position: "relative" }}>
      {/* 아바타 (카드 위에 겹침) */}
      <RNView
        style={{
          position: "absolute",
          left: 14,
          top: 18,
          width: 50,
          height: 50,
          zIndex: 1,
        }}
      >
        <Image
          source={require("@/assets/images/home_avatar.png")}
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />
        <Image
          source={require("@/assets/images/home_avatar_inner1.png")}
          style={{
            position: "absolute",
            width: 33,
            height: 33,
            top: 8.5,
            left: 9,
          }}
          resizeMode="contain"
        />
        <Image
          source={require("@/assets/images/home_avatar_inner2.png")}
          style={{
            position: "absolute",
            width: 24,
            height: 24,
            top: 13,
            left: 13,
          }}
          resizeMode="contain"
        />
      </RNView>

      {/* 카드 본체 */}
      <View
        className="bg-black-100 rounded-[18px]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
          paddingTop: 14,
          paddingBottom: 14,
          paddingLeft: 76,
          paddingRight: 14,
        }}
      >
        {/* 상단: 스트릭 텍스트 + 화살표 */}
        <Pressable
          className="flex-row items-center gap-1"
          onPress={() => router.push("/study-management")}
        >
          <Text
            className="text-h7 text-black-800"
            style={{ letterSpacing: -0.78 }}
          >
            연속 학습 100일째
          </Text>
          <ChevronRight width={12} height={12} color="#262C31" />
        </Pressable>

        {/* 구분선 */}
        <View className="my-2 bg-black-300" style={{ height: 0.5 }} />

        {/* 하단: 오늘 공부 시간 + 목표 */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-1">
            <Text className="text-c5 text-black-700">오늘 공부 시간 </Text>
            <Text className="text-c4 text-black-700">1h</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-c5 text-black-700">오늘의 목표 문장</Text>
            <Text className="text-c4 text-black-800">0/10</Text>
          </View>
        </View>

        {/* 목표 달성 알림 필 */}
        <View
          className="mt-3 self-center items-center justify-center"
          style={{
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.2)",
            borderRadius: 62,
            paddingHorizontal: 14,
            paddingVertical: 6,
          }}
        >
          <Text className="text-c5 text-black-900">
            10문장만 더 학습하면 오늘 목표 달성
          </Text>
        </View>
      </View>
    </View>
  );
}

// ── 코스 카드 ────────────────────────────────────
function CourseCard() {
  return (
    <View
      className="mx-5 mt-4 overflow-hidden"
      style={{
        backgroundColor: "#FCFCFE",
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#CD9A76",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      {/* 배경 블롭 (장식용, absolute 유지) */}
      <Image
        source={require("@/assets/images/home_course_bg.png")}
        style={{
          position: "absolute",
          width: 355,
          height: 282,
          top: -95,
          left: -61,
        }}
        resizeMode="contain"
      />

      {/* 카드 콘텐츠 */}
      <View className="px-[14px] pt-[11px] pb-[18px] gap-4">
        {/* 설정 아이콘 행 */}
        <View className="items-end">
          <Image
            source={require("@/assets/images/home_gear.png")}
            style={{ width: 23, height: 23 }}
            resizeMode="contain"
          />
        </View>

        {/* 텍스트 + 진행률 링 */}
        <View className="flex-row items-center">
          <View className="flex-1 gap-2">
            <Text className="text-h5 text-black-900">실전 회화</Text>
            <Text className="text-c4 text-black-700">중급 코스</Text>
            <View className="flex-row items-center gap-1">
              <Text className="text-c4 text-black-700">하루 목표</Text>
              <Text className="text-b6 text-black-800">5</Text>
              <Text className="text-c4 text-black-700">개</Text>
            </View>
          </View>
          <ProgressRing progress={30} size={130} strokeWidth={10} />
        </View>

        {/* 버튼 */}
        <Button>바로 시작하기</Button>
      </View>
    </View>
  );
}

// ── 퀵 액세스 카드 ────────────────────────────────
function QuickAccessCards() {
  return (
    <View className="flex-row mx-5 mt-4 gap-[13px]">
      <QuickAccessCard
        label="강의"
        icon={require("@/assets/images/home_course_icon.png")}
        iconStyle={{ width: 64, height: 50 }}
        onPress={() => router.push("/(tabs)/course")}
      />
      <QuickAccessCard
        label="내가 저장한 문장"
        icon={require("@/assets/images/home_saved_icon.png")}
        iconStyle={{ width: 74, height: 74, marginBottom: 2 }}
        onPress={() => router.push("/saved-content")}
      />
    </View>
  );
}

// ── 구독 토스트 ──────────────────────────────────
function SubscriptionToast() {
  return (
    <Pressable
      className="mx-5 flex-row items-center justify-center gap-1"
      onPress={() => router.push("/subscription")}
      style={{
        backgroundColor: "#5ECECE",
        borderRadius: 9,
        paddingVertical: 9,
        paddingHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      <Text className="text-b8 text-black-100">
        아직 한귤 구독 전이라면?{" "}
        <Text className="text-b8 text-primary-900">지금 바로 구독하세요!</Text>
      </Text>
      <ChevronRight width={12} height={12} color="#FF6700" />
    </Pressable>
  );
}

// ── 메인 홈 화면 ─────────────────────────────────
export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFF8F1" }}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* 헤더 */}
        <View className="flex-row items-center justify-between px-5 pt-3 pb-2">
          <Text
            className="text-b6 text-black-800"
            style={{ letterSpacing: -0.74 }}
          >
            00님, <Text className="text-c4 text-black-800">반가워요! </Text>
          </Text>
          <Pressable onPress={() => router.push("/notifications")}>
            <BellIcon width={24} height={24} color="#262C31" />
          </Pressable>
        </View>

        <StreakCard />
        <CourseCard />
        <QuickAccessCards />

        <View className="mt-4">
          <SubscriptionToast />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

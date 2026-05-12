import { useRef, useState } from "react";
import { Pressable as RNPressable, View as RNView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import type { DateData } from "react-native-calendars";
import { View, Text, ScrollView } from "@/src/tw";
import { TopNav } from "@/src/components/TopNav";
import { BarChart, BarItem } from "@/src/components/BarChart";
import { DropdownMenu } from "@/src/components/DropdownMenu";
import { DropdownButton } from "@/src/components/DropdownButton";
import ChevronRight from "@/assets/icons/chevron_right.svg";

// ── 타입 ─────────────────────────────────────────
type TabType = "연속 학습" | "학습 관리";
type PeriodType = "7일" | "2주" | "1달" | "3달" | "6달" | "1년" | "전체";

const TAB_OPTIONS: TabType[] = ["연속 학습", "학습 관리"];
const PERIOD_OPTIONS: PeriodType[] = [
  "7일",
  "2주",
  "1달",
  "3달",
  "6달",
  "1년",
  "전체",
];

type ChartDataMap = Record<PeriodType, BarItem[]>;

// ── 학습 관리 차트 데이터 ────────────────────────
const MANAGEMENT_CHART: ChartDataMap = {
  "7일": [
    { label: "월", columnHeight: 140 },
    { label: "화", columnHeight: 160 },
    { label: "수", columnHeight: 120 },
    { label: "목", columnHeight: 170 },
    { label: "금", columnHeight: 110 },
    { label: "토", columnHeight: 145 },
    { label: "일", columnHeight: 205, isHighlight: true, topLabel: "1h33m" },
  ],
  "2주": [
    { label: "8", columnHeight: 110 },
    { label: "9", columnHeight: 130 },
    { label: "10", columnHeight: 150 },
    { label: "11", columnHeight: 120 },
    { label: "12", columnHeight: 140 },
    { label: "13", columnHeight: 125 },
    { label: "14", columnHeight: 145 },
    { label: "15", columnHeight: 160 },
    { label: "16", columnHeight: 135 },
    { label: "17", columnHeight: 155 },
    { label: "18", columnHeight: 120 },
    { label: "19", columnHeight: 140 },
    { label: "20", columnHeight: 155 },
    { label: "21", columnHeight: 205, isHighlight: true, topLabel: "1h33m" },
  ],
  "1달": [
    { label: "1주", columnHeight: 145 },
    { label: "2주", columnHeight: 170 },
    { label: "3주", columnHeight: 155 },
    { label: "4주", columnHeight: 205, isHighlight: true, topLabel: "8h" },
  ],
  "3달": [
    { label: "10월", columnHeight: 150 },
    { label: "11월", columnHeight: 170 },
    { label: "12월", columnHeight: 205, isHighlight: true, topLabel: "42h" },
  ],
  "6달": [
    { label: "7월", columnHeight: 130 },
    { label: "8월", columnHeight: 150 },
    { label: "9월", columnHeight: 145 },
    { label: "10월", columnHeight: 170 },
    { label: "11월", columnHeight: 160 },
    { label: "12월", columnHeight: 205, isHighlight: true, topLabel: "42h" },
  ],
  "1년": [
    { label: "1월", columnHeight: 110 },
    { label: "2월", columnHeight: 130 },
    { label: "3월", columnHeight: 120 },
    { label: "4월", columnHeight: 150 },
    { label: "5월", columnHeight: 140 },
    { label: "6월", columnHeight: 135 },
    { label: "7월", columnHeight: 160 },
    { label: "8월", columnHeight: 170 },
    { label: "9월", columnHeight: 145 },
    { label: "10월", columnHeight: 180 },
    { label: "11월", columnHeight: 165 },
    { label: "12월", columnHeight: 205, isHighlight: true, topLabel: "42h" },
  ],
  전체: [
    { label: "2022", columnHeight: 130 },
    { label: "2023", columnHeight: 165 },
    { label: "2024", columnHeight: 150 },
    { label: "2025", columnHeight: 205, isHighlight: true, topLabel: "300h" },
  ],
};

// ── 연속 학습 캘린더 데이터 ──────────────────────
const STREAK_DAYS = 2;

const COMPLETED_DATES: Record<string, true> = {
  "2026-04-02": true,
  "2026-04-03": true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MARKED_DATES: Record<string, any> = Object.fromEntries(
  Object.keys(COMPLETED_DATES).map((d) => [d, { completed: true }])
);

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

interface CalDayProps {
  date?: DateData;
  state?: "" | "disabled" | "inactive" | "today" | "selected";
  marking?: { completed?: boolean };
  [key: string]: unknown;
}

function CalendarDay({ date, state, marking }: CalDayProps) {
  if (!date) return <RNView style={{ width: 46, height: 62 }} />;

  const isDisabled = state === "disabled";
  const isCompleted = !!marking?.completed;
  const dow = new Date(date.year, date.month - 1, date.day).getDay();

  let dayColor: string = "#262C31";
  if (isDisabled) dayColor = "#CCD1D7";
  else if (isCompleted) dayColor = "#FF6700";
  else if (dow === 0) dayColor = "#F24147";
  else if (dow === 6) dayColor = "#547CF1";

  return (
    <RNView style={{ alignItems: "center", width: 46, paddingVertical: 3 }}>
      <RNView
        style={{
          backgroundColor: isCompleted ? "#FFF7E0" : "transparent",
          borderRadius: 22,
          paddingVertical: 5,
          paddingHorizontal: 6,
          alignItems: "center",
          minWidth: 42,
        }}
      >
        <Text
          style={{
            fontFamily: isCompleted ? "Pretendard-Bold" : "Pretendard-Medium",
            fontSize: 16,
            lineHeight: 22,
            color: dayColor,
          }}
        >
          {date.day}
        </Text>
        <RNView style={{ height: 14, alignItems: "center", justifyContent: "center" }}>
          {isCompleted && (
            <Text style={{ fontFamily: "Pretendard", fontSize: 10, lineHeight: 14, color: dayColor }}>
              완료
            </Text>
          )}
        </RNView>
      </RNView>
    </RNView>
  );
}

// ── 메인 화면 ─────────────────────────────────────
export default function StudyManagementScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("학습 관리");
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("7일");
  const [tabDropdownOpen, setTabDropdownOpen] = useState(false);
  const [tabDropdownPos, setTabDropdownPos] = useState({ top: 0, left: 0 });
  const [currentCalendarDate, setCurrentCalendarDate] = useState("2026-04-01");
  const tabBtnRef = useRef<RNView>(null);

  const openTabDropdown = () => {
    tabBtnRef.current?.measureInWindow((x, y, width, height) => {
      setTabDropdownPos({ top: y + height + 4, left: x + width / 2 - 57.5 });
      setTabDropdownOpen(true);
    });
  };

  const calYear = parseInt(currentCalendarDate.split("-")[0]);
  const calMonth = parseInt(currentCalendarDate.split("-")[1]);

  const goToPrevMonth = () => {
    const d = new Date(calYear, calMonth - 2, 1);
    setCurrentCalendarDate(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`
    );
  };

  const goToNextMonth = () => {
    const d = new Date(calYear, calMonth, 1);
    setCurrentCalendarDate(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`
    );
  };

  const isManagement = activeTab === "학습 관리";
  const chartData = MANAGEMENT_CHART[selectedPeriod];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top"]}
    >
      {/* 상단 네비게이션 — 탭 드롭다운 트리거는 커스텀이라 DropdownMenu 직접 사용 */}
      <TopNav
        leftIcon="back"
        titleComponent={
          <RNView ref={tabBtnRef}>
            <RNPressable
              onPress={openTabDropdown}
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text
                style={{
                  fontFamily: "Pretendard-SemiBold",
                  fontSize: 15,
                  lineHeight: 22.25,
                  color: "#262C31",
                }}
              >
                {activeTab}
              </Text>
              <RNView
                style={{
                  transform: [{ rotate: tabDropdownOpen ? "-90deg" : "90deg" }],
                }}
              >
                <ChevronRight width={20} height={20} color="#262C31" />
              </RNView>
            </RNPressable>
          </RNView>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {isManagement ? (
          <>
            {/* 헤딩 */}
            <Text
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: 20,
                lineHeight: 27.6,
                letterSpacing: -0.2,
                color: "#000000",
                paddingHorizontal: 20,
                marginTop: 8,
              }}
            >
              꾸준히 쌓이는 기록, 대단해요!
            </Text>

            {/* 오늘 통계 카드 */}
            <RNView
              style={{
                marginHorizontal: 20,
                marginTop: 12,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                padding: 12,
                borderRadius: 8,
                backgroundColor: "#FFF8F1",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <RNView style={{ flex: 1, gap: 6 }}>
                <Text className="text-c2 text-black-700">오늘 공부한 시간</Text>
                <Text className="text-h8 text-primary-900">01:00</Text>
              </RNView>
              <RNView style={{ width: 1, height: 47, backgroundColor: "#DBDDDF" }} />
              <RNView style={{ flex: 1, gap: 6 }}>
                <Text className="text-c2 text-black-700">오늘의 목표 문장</Text>
                <Text className="text-h8 text-primary-900">0/10</Text>
              </RNView>
            </RNView>

            {/* 회색 구분 띠 */}
            <View className="mt-6 h-[7px] bg-black-200" />

            {/* 기록 섹션 헤더 */}
            <View className="flex-row items-center justify-between px-5 mt-3">
              <Text className="text-b2 text-black-800">내 학습 기록</Text>
              <DropdownButton
                items={PERIOD_OPTIONS}
                selected={selectedPeriod}
                onSelect={(item) => setSelectedPeriod(item as PeriodType)}
              />
            </View>

            {/* 바 차트 */}
            <BarChart data={chartData} />

            {/* 하단 요약 */}
            <View
              className="mx-5 mt-4 flex-row items-center justify-between p-4 rounded-[6px]"
              style={{
                backgroundColor: "#F4F6F6",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Text className="text-b8 text-black-900">배운 문장 수</Text>
              <Text className="text-b8 text-primary-900">5개</Text>
            </View>
          </>
        ) : (
          <>
            {/* 스트릭 배너 */}
            <RNView
              style={{
                marginHorizontal: 20,
                marginTop: 12,
                borderRadius: 12,
                backgroundColor: "#5B7CF6",
                paddingVertical: 14,
                paddingHorizontal: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily: "Pretendard-SemiBold",
                  fontSize: 15,
                  color: "#FFFFFF",
                  lineHeight: 22,
                  flex: 1,
                }}
              >
                {"연속 학습으로 태양이 빛나는 중\n꾸준히 " + STREAK_DAYS + "일!"}
              </Text>
              <RNView style={{ width: 80, height: 56, position: "relative" }}>
                <Text style={{ fontSize: 36, position: "absolute", right: 12, top: 0 }}>
                  ☀️
                </Text>
                <Image
                  source={require("@/assets/images/home_avatar_inner1.png")}
                  style={{
                    width: 30, height: 30, borderRadius: 15,
                    position: "absolute", bottom: 0, right: 22,
                    borderWidth: 1.5, borderColor: "#FFFFFF",
                  }}
                />
                <Image
                  source={require("@/assets/images/home_avatar.png")}
                  style={{
                    width: 30, height: 30, borderRadius: 15,
                    position: "absolute", bottom: 0, right: 2,
                    borderWidth: 1.5, borderColor: "#FFFFFF",
                  }}
                />
              </RNView>
            </RNView>

            {/* 캘린더 헤더: 이전/다음 월 + 연도/월 숫자 + 아바타 */}
            <RNView
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                marginTop: 16,
              }}
            >
              <RNPressable onPress={goToPrevMonth} hitSlop={12}>
                <Text style={{ fontSize: 22, lineHeight: 28, color: "#FF6700" }}>◀</Text>
              </RNPressable>

              <RNView style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ fontFamily: "Pretendard", fontSize: 13, lineHeight: 18, color: "#778088" }}>
                  {calYear}
                </Text>
                <Text style={{ fontFamily: "Pretendard-Bold", fontSize: 52, lineHeight: 60, color: "#000000" }}>
                  {calMonth}
                </Text>
              </RNView>

              <RNView style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <RNPressable onPress={goToNextMonth} hitSlop={12}>
                  <Text style={{ fontSize: 22, lineHeight: 28, color: "#FF6700" }}>▶</Text>
                </RNPressable>
                <Image
                  source={require("@/assets/images/home_avatar.png")}
                  style={{ width: 36, height: 36, borderRadius: 18 }}
                />
              </RNView>
            </RNView>

            {/* 요일 헤더 */}
            <RNView style={{ flexDirection: "row", paddingHorizontal: 4, marginTop: 8, marginBottom: 2 }}>
              {DAY_NAMES.map((name, i) => (
                <RNView key={i} style={{ flex: 1, alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: 12,
                      lineHeight: 17,
                      color: i === 0 ? "#F24147" : i === 6 ? "#547CF1" : "#778088",
                    }}
                  >
                    {name}
                  </Text>
                </RNView>
              ))}
            </RNView>

            {/* 캘린더 날짜 그리드 */}
            <Calendar
              key={currentCalendarDate}
              current={currentCalendarDate}
              markedDates={MARKED_DATES}
              markingType="custom"
              firstDay={0}
              hideArrows
              hideDayNames
              renderHeader={() => null}
              hideExtraDays={false}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              dayComponent={CalendarDay as any}
              theme={{ calendarBackground: "#FFFFFF", textMonthFontSize: 0 }}
              style={{ paddingTop: 0 }}
            />
          </>
        )}
      </ScrollView>

      {/* 탭 드롭다운 팝업 */}
      {tabDropdownOpen && (
        <DropdownMenu
          items={TAB_OPTIONS}
          selectedItem={activeTab}
          position={tabDropdownPos}
          width={115}
          onSelect={(item) => setActiveTab(item as TabType)}
          onClose={() => setTabDropdownOpen(false)}
        />
      )}
    </SafeAreaView>
  );
}

import { useState } from "react";
import { View as RNView, Pressable as RNPressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import type { DateData } from "react-native-calendars";
import { View, Text, ScrollView } from "@/src/tw";
import { TopNav } from "@/src/components/TopNav";
import { colors } from "@/src/constants/colors";
import ChevronRight from "@/assets/icons/chevron_right.svg";

// ── 타입 ──────────────────────────────────────────
interface DayProps {
  date?: DateData;
  state?: "" | "disabled" | "inactive" | "today" | "selected";
  marking?: { completed?: boolean };
  [key: string]: unknown;
}

// ── 목 데이터 ─────────────────────────────────────
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

// ── 커스텀 날짜 셀 ────────────────────────────────
function CustomDay({ date, state, marking }: DayProps) {
  if (!date) return <RNView style={{ width: 46, height: 62 }} />;

  const isDisabled = state === "disabled";
  const isCompleted = !!marking?.completed;
  const dow = new Date(date.year, date.month - 1, date.day).getDay();

  let dayColor: string = colors.black[800];
  if (isDisabled) dayColor = colors.black[400];
  else if (isCompleted) dayColor = colors.primary[900];
  else if (dow === 0) dayColor = colors.negative;
  else if (dow === 6) dayColor = colors.positive;

  return (
    <RNView style={{ alignItems: "center", width: 46, paddingVertical: 3 }}>
      <RNView
        style={{
          backgroundColor: isCompleted ? colors.primary[50] : "transparent",
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
        {/* 완료 텍스트 자리 고정 (없으면 빈 공간으로 높이 통일) */}
        <RNView style={{ height: 14, alignItems: "center", justifyContent: "center" }}>
          {isCompleted && (
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: 10,
                lineHeight: 14,
                color: dayColor,
              }}
            >
              완료
            </Text>
          )}
        </RNView>
      </RNView>
    </RNView>
  );
}

// ── 메인 화면 ─────────────────────────────────────
export default function StreakCalendarScreen() {
  const [currentDate, setCurrentDate] = useState("2026-04-01");

  const year = parseInt(currentDate.split("-")[0]);
  const month = parseInt(currentDate.split("-")[1]);

  const goToPrevMonth = () => {
    const d = new Date(year, month - 2, 1);
    setCurrentDate(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`
    );
  };

  const goToNextMonth = () => {
    const d = new Date(year, month, 1);
    setCurrentDate(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top"]}
    >
      {/* TopNav */}
      <TopNav
        leftIcon="back"
        titleComponent={
          <RNPressable
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          >
            <Text
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: 15,
                lineHeight: 22.3,
                color: colors.black[800],
              }}
            >
              연속 학습
            </Text>
            <RNView style={{ transform: [{ rotate: "90deg" }] }}>
              <ChevronRight width={20} height={20} color={colors.black[800]} />
            </RNView>
          </RNPressable>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
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

          {/* 태양 + 아바타 */}
          <RNView style={{ width: 80, height: 56, position: "relative" }}>
            <Text
              style={{
                fontSize: 36,
                position: "absolute",
                right: 12,
                top: 0,
              }}
            >
              ☀️
            </Text>
            {/* 아바타 2개 겹치기 */}
            <Image
              source={require("@/assets/images/home_avatar_inner1.png")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                position: "absolute",
                bottom: 0,
                right: 22,
                borderWidth: 1.5,
                borderColor: "#FFFFFF",
              }}
            />
            <Image
              source={require("@/assets/images/home_avatar.png")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                position: "absolute",
                bottom: 0,
                right: 2,
                borderWidth: 1.5,
                borderColor: "#FFFFFF",
              }}
            />
          </RNView>
        </RNView>

        {/* 캘린더 헤더: 연도 / 월 / 이전·다음 화살표 */}
        <RNView
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            marginTop: 16,
          }}
        >
          {/* 이전 월 */}
          <RNPressable onPress={goToPrevMonth} hitSlop={12}>
            <Text
              style={{
                fontSize: 22,
                lineHeight: 28,
                color: colors.primary[900],
              }}
            >
              ◀
            </Text>
          </RNPressable>

          {/* 연도 + 큰 월 숫자 */}
          <RNView style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: 13,
                lineHeight: 18,
                color: colors.black[600],
              }}
            >
              {year}
            </Text>
            <Text
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: 52,
                lineHeight: 60,
                color: colors.black[900],
              }}
            >
              {month}
            </Text>
          </RNView>

          {/* 다음 월 + 유저 아바타 */}
          <RNView style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <RNPressable onPress={goToNextMonth} hitSlop={12}>
              <Text
                style={{
                  fontSize: 22,
                  lineHeight: 28,
                  color: colors.primary[900],
                }}
              >
                ▶
              </Text>
            </RNPressable>
            <Image
              source={require("@/assets/images/home_avatar.png")}
              style={{ width: 36, height: 36, borderRadius: 18 }}
            />
          </RNView>
        </RNView>

        {/* 요일 헤더 (일=빨강, 토=파랑) */}
        <RNView
          style={{
            flexDirection: "row",
            paddingHorizontal: 4,
            marginTop: 8,
            marginBottom: 2,
          }}
        >
          {DAY_NAMES.map((name, i) => (
            <RNView key={i} style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: 12,
                  lineHeight: 17,
                  color:
                    i === 0
                      ? colors.negative
                      : i === 6
                        ? colors.positive
                        : colors.black[600],
                }}
              >
                {name}
              </Text>
            </RNView>
          ))}
        </RNView>

        {/* 캘린더 날짜 그리드 */}
        <Calendar
          key={currentDate}
          current={currentDate}
          markedDates={MARKED_DATES}
          markingType="custom"
          firstDay={0}
          hideArrows
          hideDayNames
          renderHeader={() => null}
          hideExtraDays={false}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dayComponent={CustomDay as any}
          theme={{
            calendarBackground: "#FFFFFF",
            textMonthFontSize: 0,  // 기본 헤더 월 텍스트 숨김
          }}
          style={{ paddingTop: 0 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

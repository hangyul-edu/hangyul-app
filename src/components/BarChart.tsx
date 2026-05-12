import { View as RNView } from "react-native";
import { Text } from "@/src/tw";

export interface BarItem {
  label: string;
  columnHeight: number;
  isHighlight?: boolean;
  topLabel?: string;
}

interface BarChartProps {
  data: BarItem[];
}

export function BarChart({ data }: BarChartProps) {
  const count = data.length;
  // 바 개수에 따라 레이블 폰트 크기 조정
  const labelFontSize = count > 10 ? 10 : count > 7 ? 11 : 14;
  const labelLineHeight = labelFontSize * 1.536;

  return (
    <RNView
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 4,
        paddingHorizontal: 20,
        marginTop: 16,
      }}
    >
      {data.map((item) => (
        <RNView
          key={item.label}
          style={{
            // 모든 바 동일하게 flex: 1로 너비 균등 분배
            flex: 1,
            minWidth: 0,
            height: item.columnHeight,
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
          }}
        >
          {/* 하이라이트 바 상단 값 레이블 */}
          {item.isHighlight && (
            <Text
              numberOfLines={1}
              style={{
                fontFamily: "Pretendard-Medium",
                fontSize: labelFontSize,
                lineHeight: labelLineHeight,
                color: "#FF6700",
                textAlign: "center",
              }}
            >
              {item.topLabel}
            </Text>
          )}

          {/* 바 */}
          <RNView
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: item.isHighlight ? "#FF6700" : "#DBDDDF",
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 4,
            }}
          />

          {/* 하단 날짜 레이블 */}
          <Text
            numberOfLines={1}
            style={{
              fontFamily: "Pretendard-Medium",
              fontSize: labelFontSize,
              lineHeight: labelLineHeight,
              color: "#9E9E9E",
              textAlign: "center",
            }}
          >
            {item.label}
          </Text>
        </RNView>
      ))}
    </RNView>
  );
}

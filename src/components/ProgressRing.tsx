import { View as RNView, Text as RNText } from "react-native";
import Svg, { Path } from "react-native-svg";

interface ProgressRingProps {
  /** 진행률 (0~100) */
  progress: number;
  /** 컴포넌트 크기 (px), 기본값 100 */
  size?: number;
  /** 링 두께 (px), 기본값 10 */
  strokeWidth?: number;
  /** 링 색상, 기본값 #FF6700 */
  color?: string;
  /** 트랙(빈 부분) 색상, 기본값 #EDD9C2 */
  trackColor?: string;
}

const toRad = (deg: number) => (deg * Math.PI) / 180;

/**
 * 원형 진행률 링
 *
 * 하단에 약 60° 갭이 있는 C자형 아크로 구성됩니다.
 * - 시작: 8시 방향 (120°)
 * - 전체 호 길이: 300° (clockwise)
 * - 중앙에 progress % 텍스트 표시
 */
export function ProgressRing({
  progress,
  size = 100,
  strokeWidth = 10,
  color = "#FF6700",
  trackColor = "#FFEAD7",
}: ProgressRingProps) {
  const clamped = Math.min(100, Math.max(0, progress));
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;

  // 하단 60° 갭을 두고 시작/종료
  // SVG 각도 기준: 0° = 3시, 시계방향 증가, y축 아래 방향
  const START_ANGLE = 120; // 8시 방향 (하단-좌측)
  const TOTAL_SWEEP = 300; // 300° = 360° - 60° 갭

  const getPoint = (deg: number) => ({
    x: cx + radius * Math.cos(toRad(deg)),
    y: cy + radius * Math.sin(toRad(deg)),
  });

  const start = getPoint(START_ANGLE);
  const trackEnd = getPoint(START_ANGLE + TOTAL_SWEEP);

  // 트랙 (전체 300° 호)
  // largeArcFlag = 1 (300° > 180°)
  const trackPath = `M ${start.x} ${start.y} A ${radius} ${radius} 0 1 1 ${trackEnd.x} ${trackEnd.y}`;

  // 진행률 호
  const progressSweep = (clamped / 100) * TOTAL_SWEEP;
  const progressEnd = getPoint(START_ANGLE + progressSweep);
  const progressLargeArc = progressSweep > 180 ? 1 : 0;
  const progressPath =
    clamped > 0
      ? `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${progressLargeArc} 1 ${progressEnd.x} ${progressEnd.y}`
      : null;

  return (
    <RNView
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* SVG 아크 */}
      <Svg
        width={size}
        height={size}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* 트랙 (빈 부분) */}
        <Path
          d={trackPath}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {/* 진행률 (채워진 부분) */}
        {progressPath && (
          <Path
            d={progressPath}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
        )}
      </Svg>

      {/* 중앙 텍스트 */}
      <RNView style={{ alignItems: "center" }}>
        <RNText style={{ color, textAlign: "center", includeFontPadding: false }}>
          <RNText style={{ fontSize: 40, fontFamily: "Pretendard-Bold", color }}>
            {clamped}
          </RNText>
          <RNText style={{ fontSize: 18, fontFamily: "Pretendard-Bold", color }}>
            %
          </RNText>
        </RNText>
      </RNView>
    </RNView>
  );
}

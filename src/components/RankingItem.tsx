import Svg, {
  Path,
  Circle as SvgCircle,
  Rect,
  G,
  Defs,
  ClipPath,
  Text as SvgText,
} from "react-native-svg";
import { View, Text } from "@/src/tw";

interface RankingItemProps {
  rank: number;
  name: string;
  level: string;
  points: string;
  isMe?: boolean;
  highlighted?: boolean; // sticky bottom row에서 강조용
}

const CROWN_COLORS: Record<number, { primary: string; secondary: string }> = {
  1: { primary: "#FFCD00", secondary: "#FFAD00" },
  2: { primary: "#D3EDFA", secondary: "#9BD1EC" },
  3: { primary: "#EAEAEA", secondary: "#CFCFCF" },
};

function CrownBadge({ rank }: { rank: 1 | 2 | 3 }) {
  const { primary, secondary } = CROWN_COLORS[rank];
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
      <Defs>
        <ClipPath id={`crown-clip-${rank}`}>
          <Rect width="40" height="40" fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath={`url(#crown-clip-${rank})`}>
        <Path
          d="M32.35 30.7673L35.154 15.7113C35.278 15.0453 34.569 14.5353 33.977 14.8663L28.981 17.6593C27.586 18.4392 25.825 17.9883 24.976 16.6343L20.678 9.78125C20.364 9.28125 19.636 9.28125 19.323 9.78125L15.025 16.6343C14.176 17.9883 12.415 18.4383 11.02 17.6593L6.02403 14.8663C5.43203 14.5353 4.72303 15.0443 4.84703 15.7113L7.65103 30.7673"
          fill={primary}
        />
        <Path
          d="M30.767 35.5166H9.23302C8.28302 35.5166 7.65002 34.8836 7.65002 33.9336V30.7666H32.35V33.9336C32.35 34.7256 31.717 35.5166 30.767 35.5166Z"
          fill={secondary}
        />
        <Path
          d="M20 9.40487C21.399 9.40487 22.533 8.2708 22.533 6.87187C22.533 5.47293 21.399 4.33887 20 4.33887C18.6011 4.33887 17.467 5.47293 17.467 6.87187C17.467 8.2708 18.6011 9.40487 20 9.40487Z"
          fill={secondary}
        />
        <Path
          d="M36.467 15.566C37.8659 15.566 39 14.4319 39 13.033C39 11.6341 37.8659 10.5 36.467 10.5C35.068 10.5 33.934 11.6341 33.934 13.033C33.934 14.4319 35.068 15.566 36.467 15.566Z"
          fill={secondary}
        />
        <Path
          d="M3.533 15.566C4.93194 15.566 6.066 14.4319 6.066 13.033C6.066 11.6341 4.93194 10.5 3.533 10.5C2.13406 10.5 1 11.6341 1 13.033C1 14.4319 2.13406 15.566 3.533 15.566Z"
          fill={secondary}
        />
        <SvgCircle cx="20" cy="24" r="6" fill="white" />
        <SvgText
          x="20"
          y="27.5"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#778088"
        >
          {rank}
        </SvgText>
      </G>
    </Svg>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank <= 3) {
    return <CrownBadge rank={rank as 1 | 2 | 3} />;
  }

  return (
    <View style={{ width: 40, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 14, fontWeight: "500", color: "#778088" }}>
        {rank}
      </Text>
    </View>
  );
}

export function RankingItem({
  rank,
  name,
  level,
  points,
  isMe,
  highlighted,
}: RankingItemProps) {
  const isTop3 = rank <= 3;

  return (
    <View
      style={isMe ? { marginHorizontal: 12, marginVertical: 2 } : undefined}
    >
    <View
      className="flex-row items-center py-[14px]"
      style={{
        paddingHorizontal: isMe ? 8 : 20,
        backgroundColor: isMe ? "rgba(255, 103, 0, 0.05)" : "#FFFFFF",
        borderWidth: isMe ? 1 : 0,
        borderColor: "#FF6700",
        borderRadius: isMe ? 12 : 0,
        borderTopWidth: !isMe && highlighted ? 0.5 : undefined,
        borderTopColor: !isMe && highlighted ? "#DBDDDF" : undefined,
      }}
    >
      {/* 순위 뱃지 */}
      <View style={{ width: 48 }}>
        <RankBadge rank={rank} />
      </View>

      {/* 유저 정보 */}
      <View style={{ width: 140, gap: 2, marginLeft: 12 }}>
        <View className="flex-row items-center gap-[6px]">
          <Text
            style={{
              fontSize: 14,
              fontWeight: isTop3 ? "700" : "600",
              color: "#262C31",
            }}
          >
            {name}
          </Text>
          {isMe && (
            <View
              style={{
                backgroundColor: "#262C31",
                borderRadius: 999,
                width: 20,
                height: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text className="text-c1 text-black-100">나</Text>
            </View>
          )}
        </View>
        <Text style={{ fontSize: 12, fontWeight: "500", color: "#778088" }}>
          {level}
        </Text>
      </View>

      {/* 포인트 */}
      <Text style={{ fontSize: 12, fontWeight: "500", color: "#262C31" }}>
        {points}
      </Text>
    </View>
    </View>
  );
}

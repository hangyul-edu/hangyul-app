import { View, Text, Pressable } from "@/src/tw";
import IcPlay from "@/assets/icons/ic_play.svg";
import IcTrash from "@/assets/icons/ic_trash.svg";

interface ContentListItemProps {
  unit: string;
  title: string;
  onPlay?: () => void;
  onDelete?: () => void;
}

export function ContentListItem({
  unit,
  title,
  onPlay,
  onDelete,
}: ContentListItemProps) {
  return (
    <View
      className="flex-row items-center bg-white rounded-xl overflow-hidden"
      style={{ height: 56 }}
    >
      {/* 콘텐츠 */}
      <View className="flex-1 flex-row items-center px-4" style={{ gap: 8 }}>
        {/* 왼쪽 오렌지 바 */}
        <View
          style={{
            width: 4,
            height: 23,
            backgroundColor: "#FF6700",
            borderRadius: 2,
          }}
        />

        {/* 유닛 뱃지 */}
        <View
          className="items-center justify-center px-[6px] py-[3px] rounded-md"
          style={{ backgroundColor: "#ECEDF0" }}
        >
          <Text style={{ fontSize: 12, fontWeight: "500", color: "#5A636A" }}>
            {unit}
          </Text>
        </View>

        {/* 제목 */}
        <Text
          className="flex-1 text-black-800"
          style={{ fontSize: 13, fontWeight: "600" }}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {/* 우측 액션 버튼 */}
      <View className="flex-row items-center gap-4 pr-4">
        {/* 재생 버튼 */}
        <Pressable
          onPress={onPlay}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#FF6700",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IcPlay
            width={20}
            height={20}
            color="#FFFFFF"
            style={{ marginLeft: 2, marginTop: 2 }}
          />
        </Pressable>

        {/* 삭제 버튼 */}
        <Pressable
          onPress={onDelete}
          style={{
            width: 24,
            height: 24,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IcTrash width={16} height={16} color="#ADB4BA" />
        </Pressable>
      </View>
    </View>
  );
}

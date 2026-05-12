import { FlatList } from "react-native";
import { View, Text, Pressable } from "@/src/tw";

export interface NotificationItem {
  id: string;
  title: string;
  date: string;
  content?: string;
  isRead: boolean;
}

interface NotificationListProps {
  data: NotificationItem[];
  accentColor?: string;
  onPressItem?: (item: NotificationItem) => void;
}

function NotificationListItem({
  item,
  accentColor,
  onPress,
}: {
  item: NotificationItem;
  accentColor: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      className="px-5 py-[25px]"
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor: "#DBDDDF",
        backgroundColor: item.isRead ? "#FFFFFF" : "rgba(94, 206, 206, 0.05)",
      }}
      onPress={onPress}
    >
      <View className="flex-row items-center gap-[6px] mb-[5px]">
        <Text className="text-b4 text-black-800 flex-shrink" numberOfLines={1}>
          {item.title}
        </Text>
        {!item.isRead && (
          <View
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: accentColor,
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 8, fontWeight: "700", lineHeight: 14 }}>
              N
            </Text>
          </View>
        )}
      </View>
      <Text className="text-c3 text-black-600">{item.date}</Text>
    </Pressable>
  );
}

export function NotificationList({
  data,
  accentColor = "#66CCCC",
  onPressItem,
}: NotificationListProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NotificationListItem
          item={item}
          accentColor={accentColor}
          onPress={onPressItem ? () => onPressItem(item) : undefined}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

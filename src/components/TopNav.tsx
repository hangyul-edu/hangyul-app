import { ReactNode } from "react";
import { View as RNView } from "react-native";
import { router } from "expo-router";
import { View, Text, Pressable } from "@/src/tw";
import ChevronRight from "@/assets/icons/chevron_right.svg";
import Bell from "@/assets/icons/bell.svg";
import { colors } from "@/src/constants/colors";

interface TopNavProps {
  leftIcon?: "back" | "close";
  title?: string;
  /** title 대신 사용할 커스텀 중앙 컴포넌트 */
  titleComponent?: ReactNode;
  rightIcon?: "bell";
  hasNotification?: boolean;
  onPressLeft?: () => void;
  onPressRight?: () => void;
}

export function TopNav({
  leftIcon,
  title,
  titleComponent,
  rightIcon,
  hasNotification = false,
  onPressLeft,
  onPressRight,
}: TopNavProps) {
  const handleLeft = onPressLeft ?? (() => router.back());

  return (
    <View className="flex-row items-center px-5 h-[50px]">
      {/* 왼쪽 */}
      <View className="w-6 h-6 items-center justify-center">
        {leftIcon === "back" && (
          <Pressable onPress={handleLeft}>
            <RNView style={{ transform: [{ rotate: "180deg" }] }}>
              <ChevronRight color={colors.black[800]} width={24} height={24} />
            </RNView>
          </Pressable>
        )}
        {leftIcon === "close" && (
          <Pressable onPress={handleLeft}>
            <Text
              style={{ fontSize: 20, color: colors.black[800], lineHeight: 24 }}
            >
              ×
            </Text>
          </Pressable>
        )}
      </View>

      {/* 가운데 타이틀 */}
      <View className="flex-1 items-center">
        {titleComponent ?? (title && <Text className="text-b4 text-black-800">{title}</Text>)}
      </View>

      {/* 오른쪽 */}
      <View className="w-6 h-6 items-center justify-center">
        {rightIcon === "bell" && (
          <Pressable onPress={onPressRight} className="relative">
            <Bell color={colors.black[800]} width={24} height={24} />
            {hasNotification && (
              <View className="absolute top-0 right-0 w-1 h-1 rounded-full bg-primary-900" />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

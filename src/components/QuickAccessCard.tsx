import { Image, ImageSourcePropType, ImageStyle, Pressable } from "react-native";
import { Text } from "@/src/tw";

interface QuickAccessCardProps {
  label: string;
  icon: ImageSourcePropType;
  iconStyle?: ImageStyle;
  onPress?: () => void;
}

export function QuickAccessCard({
  label,
  icon,
  iconStyle,
  onPress,
}: QuickAccessCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        height: 132,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#D9D9D9",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 16,
      }}
    >
      <Image
        source={icon}
        style={[{ marginBottom: 8 }, iconStyle]}
        resizeMode="contain"
      />
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Pretendard-SemiBold",
          color: "#6E7385",
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

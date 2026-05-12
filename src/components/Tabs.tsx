import { View, Text, Pressable } from "@/src/tw";

interface TabsProps {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
  className?: string;
  /** "fill": 각 탭이 flex-1로 너비를 채움 (기본값) | "start": 탭이 콘텐츠 너비만큼만 차지 */
  align?: "fill" | "start";
}

export const Tabs = ({ tabs, activeIndex, onChange, className = "", align = "fill" }: TabsProps) => {
  const isFill = align === "fill";

  return (
    <View className={`flex-row ${className}`}>
      {tabs.map((label, index) => {
        const isActive = index === activeIndex;
        return (
          <Pressable
            key={label}
            className={`${isFill ? "flex-1" : "px-4"} h-[44px] items-center justify-end gap-2`}
            onPress={() => onChange(index)}
          >
            <Text
              className={`text-b6 ${isActive ? "text-black-800" : "text-black-500"}`}
              style={isActive ? { fontWeight: "600" } : undefined}
            >
              {label}
            </Text>
            <View
              className={`h-[2px] w-full ${isActive ? "bg-primary-900" : isFill ? "bg-[#DBDDDF]" : "bg-transparent"}`}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

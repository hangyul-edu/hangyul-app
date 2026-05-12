import { View, Text, Pressable } from "@/src/tw";
import { colors } from "@/src/constants/colors";

export interface SelectOption {
  id: string;
  label: string;
  description?: string;
  badge?: string;
}

interface SelectListProps {
  options: SelectOption[];
  value: string;
  onChange: (id: string) => void;
}

export function SelectList({ options, value, onChange }: SelectListProps) {
  return (
    <View className="gap-2 w-full">
      {options.map((option) => {
        const isSelected = option.id === value;
        return (
          <Pressable
            key={option.id}
            onPress={() => onChange(option.id)}
            className="flex-row items-center px-4 py-[15px] rounded-lg"
            style={{
              backgroundColor: isSelected
                ? "rgba(255, 103, 0, 0.1)"
                : "#FFFFFF",
              borderWidth: isSelected ? 0.5 : 1,
              borderColor: isSelected ? colors.primary[900] : "#ECEDF0",
            }}
          >
            {/* 라벨 + 배지 */}
            <View className="flex-row items-center gap-[6px] flex-1">
              <Text
                className="text-b6"
                style={{
                  fontWeight: "700",
                  color: isSelected ? colors.primary[900] : colors.black[700],
                }}
              >
                {option.label}
              </Text>

              {option.description && (
                <Text className="text-b6 text-black-600">
                  {option.description}
                </Text>
              )}
              {option.badge && (
                <View
                  className="px-[8px] py-[4px] rounded-full"
                  style={{ backgroundColor: "rgba(94, 206, 206, 0.2)" }}
                >
                  <Text className="text-c1 text-brand-teal">
                    {option.badge}
                  </Text>
                </View>
              )}
            </View>

            {/* 체크 */}
            {isSelected && (
              <View
                className="items-center justify-center rounded-[4px]"
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: colors.primary[900],
                }}
              >
                <Text
                  style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "800" }}
                >
                  ✓
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

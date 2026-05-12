import { Fragment } from "react";
import { Modal, Pressable as RNPressable, View as RNView } from "react-native";
import { Text } from "@/src/tw";

export interface DropdownMenuProps {
  items: string[];
  selectedItem: string;
  /** Modal 안에서 absolute 위치 (measure로 계산한 화면 좌표) */
  position: { top: number; left: number };
  width?: number;
  onSelect: (item: string) => void;
  onClose: () => void;
}

export function DropdownMenu({
  items,
  selectedItem,
  position,
  width = 150,
  onSelect,
  onClose,
}: DropdownMenuProps) {
  return (
    <Modal
      transparent
      visible
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* 배경 터치 시 닫힘 */}
      <RNPressable
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)" }}
        onPress={onClose}
      >
        {/* 드롭다운 패널 */}
        <RNPressable
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            width,
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 10,
            shadowColor: "#595959",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.18,
            shadowRadius: 8,
            elevation: 8,
          }}
          onPress={(e) => e.stopPropagation()}
        >
          {items.map((item, index) => (
            <Fragment key={item}>
              <RNPressable
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                style={{ paddingVertical: 10, alignItems: "center" }}
              >
                <Text
                  style={{
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: 14,
                    lineHeight: 21.5,
                    letterSpacing: -0.42,
                    color: item === selectedItem ? "#FF6700" : "#18181B",
                    textAlign: "center",
                  }}
                >
                  {item}
                </Text>
              </RNPressable>
              {index < items.length - 1 && (
                <RNView
                  style={{
                    height: 0.5,
                    backgroundColor: "#E4E4E7",
                  }}
                />
              )}
            </Fragment>
          ))}
        </RNPressable>
      </RNPressable>
    </Modal>
  );
}

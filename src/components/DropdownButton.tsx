import { useRef, useState } from "react";
import { Pressable as RNPressable, View as RNView } from "react-native";
import { Text } from "@/src/tw";
import ChevronRight from "@/assets/icons/chevron_right.svg";
import { DropdownMenu } from "@/src/components/DropdownMenu";

export interface DropdownButtonProps {
  items: string[];
  selected: string;
  onSelect: (item: string) => void;
  /** 드롭다운 팝업 너비 (기본 162) */
  menuWidth?: number;
}

/**
 * 테두리 버튼 트리거 + DropdownMenu 조합
 * - 선택값 표시 + 화살표
 * - 열릴 때 테두리 오렌지색, 화살표 위로
 * - 드롭다운은 버튼 우측 끝에 맞춰 정렬
 */
export function DropdownButton({
  items,
  selected,
  onSelect,
  menuWidth = 130,
}: DropdownButtonProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<RNView>(null);

  const handlePress = () => {
    btnRef.current?.measureInWindow((x, y, width, height) => {
      setPos({ top: y + height + 4, left: x + width - menuWidth });
      setOpen(true);
    });
  };

  return (
    <>
      <RNView ref={btnRef}>
        <RNPressable
          onPress={handlePress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: "#FFFFFF",
            borderWidth: 1,
            borderColor: open ? "#FF6700" : "#ECECEC",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4,
          }}
        >
          <Text
            style={{
              fontFamily: "Pretendard-SemiBold",
              fontSize: 15,
              lineHeight: 22.25,
              letterSpacing: -0.09,
              color: "#262C31",
            }}
          >
            {selected}
          </Text>
          <RNView
            style={{ transform: [{ rotate: open ? "-90deg" : "90deg" }] }}
          >
            <ChevronRight width={20} height={20} color="#262C31" />
          </RNView>
        </RNPressable>
      </RNView>

      {open && (
        <DropdownMenu
          items={items}
          selectedItem={selected}
          position={pos}
          width={menuWidth}
          onSelect={onSelect}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

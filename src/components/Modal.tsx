import { Modal as RNModal } from "react-native";
import { View, Text, Pressable } from "@/src/tw";

interface ModalProps {
  visible: boolean;
  title?: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const Modal = ({
  visible,
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  onCancel,
}: ModalProps) => {
  const isDualBtn = !!onCancel;

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      {/* Backdrop */}
      <View className="flex-1 justify-center items-center bg-black/50 px-[28px]">
        {/* Modal Box */}
        <View className="w-[320px] bg-white rounded-[10px] pt-[30px] pb-5 px-5 gap-[18px]">
          {/* Content */}
          <View className="gap-[5px]">
            {title && (
              <Text className="text-h8 text-black-800 text-center">
                {title}
              </Text>
            )}
            <Text className="text-b6 text-black-600 text-center">
              {description}
            </Text>
          </View>

          {/* Buttons */}
          {isDualBtn ? (
            <View className="flex-row gap-2">
              {/* 취소 */}
              <Pressable
                className="flex-1 items-center justify-center py-[14px] rounded-xl bg-black-500"
                onPress={onCancel}
              >
                <Text className="text-b4 text-white">{cancelLabel}</Text>
              </Pressable>
              {/* 확인 */}
              <Pressable
                className="flex-1 items-center justify-center py-[14px] rounded-xl bg-primary-900"
                onPress={onConfirm}
              >
                <Text className="text-b4 text-white">{confirmLabel}</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              className="items-center justify-center py-[14px] rounded-xl bg-primary-900"
              onPress={onConfirm}
            >
              <Text className="text-b4 text-white">{confirmLabel}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </RNModal>
  );
};

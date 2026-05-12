import { Fragment, useRef, useState } from "react";
import {
  KeyboardTypeOptions,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View as RNView,
} from "react-native";
import { Eye, EyeOff, XCircle } from "lucide-react-native";
import { Text, View } from "@/src/tw";

interface InputFieldProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  /** 하단 좌측 회색 도움말 */
  helperText?: string;
  /** 하단 좌측 초록 성공 메시지 */
  successText?: string;
  /** 하단 좌측 빨간 에러 메시지 */
  errorText?: string;
  password?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  /** 입력창 우측에 붙는 버튼 텍스트 */
  actionLabel?: string;
  onAction?: () => void;
  /** 글자 수 표시용 최대 길이 (설정 시 하단 우측에 n/maxLength 표시) */
  maxLength?: number;
  className?: string;
}

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  helperText,
  successText,
  errorText,
  password,
  keyboardType,
  autoCapitalize,
  actionLabel,
  onAction,
  maxLength,
  className,
}: InputFieldProps) {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(!!value);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChangeText = (text: string) => {
    setHasText(text.length > 0);
    onChangeText(text);
  };

  const handleClear = () => {
    inputRef.current?.clear();
    setHasText(false);
    onChangeText("");
  };

  // 포커스 상태이고 텍스트가 있을 때만 클리어 버튼 표시 (Figma 스펙)
  const showClear = isFocused && hasText;

  const containerStyle = StyleSheet.flatten([
    styles.container,
    isFocused && styles.focusedContainer,
    !!errorText && styles.errorContainer,
  ]);

  const bottomTextStyle = StyleSheet.flatten([
    styles.bottomText,
    !!errorText && styles.errorBottomText,
    !!successText && !errorText && styles.successBottomText,
  ]);

  const bottomMessage = errorText ?? successText ?? helperText;
  const showBottom = !!bottomMessage || !!maxLength;

  return (
    <Fragment>
      <View className={`gap-[8px] ${className ?? ""}`}>
        {label && <Text style={styles.label}>{label}</Text>}

        <RNView style={styles.row}>
          <Pressable
            style={containerStyle}
            onPress={() => inputRef.current?.focus()}
          >
            <TextInput
              ref={inputRef}
              style={[
                styles.input,
                { paddingVertical: Platform.OS === "android" ? 0 : undefined },
              ]}
              placeholder={placeholder}
              placeholderTextColor="#9FA5B3"
              value={value}
              onChangeText={handleChangeText}
              cursorColor="#FF6700"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              secureTextEntry={password && !isPasswordVisible}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              maxLength={maxLength}
            />

            {password && showClear && (
              <RNView style={styles.rightIconContainer}>
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  {isPasswordVisible ? (
                    <Eye size={20} color="#9FA5B3" />
                  ) : (
                    <EyeOff size={20} color="#9FA5B3" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleClear}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <XCircle size={20} color="#9FA5B3" />
                </TouchableOpacity>
              </RNView>
            )}
            {!password && showClear && (
              <TouchableOpacity
                onPress={handleClear}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <XCircle size={20} color="#9FA5B3" />
              </TouchableOpacity>
            )}
          </Pressable>

          {actionLabel && (
            <Pressable style={styles.actionButton} onPress={onAction}>
              <Text style={styles.actionButtonText}>{actionLabel}</Text>
            </Pressable>
          )}
        </RNView>

        {showBottom && (
          <RNView style={styles.bottomRow}>
            <Text style={bottomTextStyle}>{bottomMessage ?? ""}</Text>
            {maxLength && (
              <Text style={styles.countText}>
                {value.length}/{maxLength}
              </Text>
            )}
          </RNView>
        )}
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 22,
    letterSpacing: -0.14,
    color: "#2C3038",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: "#F4F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCD0D9",
  },
  focusedContainer: {
    borderColor: "#FF6700",
  },
  errorContainer: {
    borderColor: "#F24147",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: -0.16,
    color: "#2C3038",
  },
  rightIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#2C3038",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: -0.12,
    color: "#737A89",
  },
  errorBottomText: {
    color: "#F0405C",
  },
  successBottomText: {
    color: "#547CF1",
  },
  countText: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: -0.12,
    color: "#737A89",
  },
});

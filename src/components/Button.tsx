import { ReactNode } from "react";
import { Pressable, Text } from "@/src/tw";

interface ButtonProps {
  variant?: "primary" | "outline";
  disabled?: boolean;
  onPress?: () => void;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  disabled = false,
  onPress,
  children,
  className = "",
}: ButtonProps) {
  const isPrimary = variant === "primary";

  const bgStyle = isPrimary
    ? { backgroundColor: disabled ? "#ECEDF0" : "#FF6700" }
    : { backgroundColor: "#FFFFFF" };

  const borderStyle = isPrimary
    ? {}
    : { borderWidth: 1, borderColor: disabled ? "#ECEDF0" : "#DBDDDF" };

  const textColor = disabled ? "#ADB4BA" : isPrimary ? "#FFFFFF" : "#262C31";

  return (
    <Pressable
      className={`w-full items-center justify-center py-[14px] rounded-xl ${className}`}
      style={[
        bgStyle,
        borderStyle,
        !disabled && {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        className={isPrimary ? "text-b4" : "text-b6"}
        style={{ color: textColor }}
      >
        {children}
      </Text>
    </Pressable>
  );
}

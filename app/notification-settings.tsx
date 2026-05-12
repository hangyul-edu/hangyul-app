import { useState } from "react";
import { Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { View, Text } from "@/src/tw";
import { TopNav } from "@/src/components/TopNav";

interface ToggleRowProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function ToggleRow({ label, value, onValueChange }: ToggleRowProps) {
  return (
    <View className="flex-row items-center justify-between px-5 py-[14px]">
      <Text className="text-b6 text-black-800">{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#BEC5CC", true: "#FF6700" }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#BEC5CC"
      />
    </View>
  );
}

export default function NotificationSettingsScreen() {
  const { t } = useTranslation();
  const [serviceAlert, setServiceAlert] = useState(true);
  const [adAlert, setAdAlert] = useState(false);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top"]}
    >
      <TopNav leftIcon="back" title={t("notificationSettings.title")} />

      <View className="mt-4">
        <ToggleRow
          label={t("notificationSettings.serviceAlert")}
          value={serviceAlert}
          onValueChange={setServiceAlert}
        />
        <ToggleRow
          label={t("notificationSettings.adAlert")}
          value={adAlert}
          onValueChange={setAdAlert}
        />
      </View>
    </SafeAreaView>
  );
}

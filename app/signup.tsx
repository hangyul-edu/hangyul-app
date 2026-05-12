import { useState } from "react";
import { ScrollView as RNScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Href } from "expo-router";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable } from "@/src/tw";
import { Button } from "@/src/components/Button";
import { TopNav } from "@/src/components/TopNav";
import { InputField } from "@/src/components/InputField";
import { colors } from "@/src/constants/colors";

// ── 체크박스 ──────────────────────────────────────
interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
}

function Checkbox({ checked, onPress }: CheckboxProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 20,
        height: 20,
        borderRadius: 4,
        backgroundColor: checked ? colors.black[800] : "#ECEDF0",
        borderWidth: checked ? 0 : 1,
        borderColor: "#ECEDF0",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: checked ? "#FFFFFF" : "#ccd1d7",
          fontSize: 13,
          fontWeight: "700",
        }}
      >
        ✓
      </Text>
    </Pressable>
  );
}

// ── 약관 항목 ──────────────────────────────────────
interface AgreementItemProps {
  label: string;
  underlinedPrefix?: string;
  onPressLabel?: () => void;
  checked: boolean;
  onPress: () => void;
}

function AgreementItem({
  label,
  underlinedPrefix,
  onPressLabel,
  checked,
  onPress,
}: AgreementItemProps) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-b6 text-black-800 flex-1 mr-3">
        {underlinedPrefix ? (
          <>
            <Text
              style={{ textDecorationLine: "underline" }}
              onPress={onPressLabel}
            >
              {underlinedPrefix}
            </Text>
            {label}
          </>
        ) : (
          label
        )}
      </Text>
      <Checkbox checked={checked} onPress={onPress} />
    </View>
  );
}

// ── 메인 화면 ──────────────────────────────────────
export default function SignupScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { t } = useTranslation();
  const [phoneVerified] = useState(true); // 디자인상 인증 완료 상태

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    thirdParty: false,
    marketing: false,
    notification: false,
    ads: false,
  });

  const allChecked = Object.values(agreements).every(Boolean);

  const toggleAll = () => {
    const next = !allChecked;
    setAgreements({
      terms: next,
      privacy: next,
      thirdParty: next,
      marketing: next,
      notification: next,
      ads: next,
    });
  };

  const toggle = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top"]}
    >
      <TopNav leftIcon="back" />

      <RNScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* 제목 */}
        <View className="mt-4 gap-2">
          <Text className="text-h1 text-black-800">{t("signup.title")}</Text>
          <Text className="text-b9 text-black-700">{t("signup.subtitle")}</Text>
        </View>

        {/* 입력 필드 */}
        <View className="mt-[22px] gap-[17px]">
          <InputField
            label={t("signup.name.label")}
            placeholder={t("signup.name.placeholder")}
            value={name}
            onChangeText={setName}
          />
          <InputField
            label={t("signup.phone.label")}
            placeholder={t("signup.phone.placeholder")}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            actionLabel={t("signup.phone.verify")}
            successText={phoneVerified ? t("signup.phone.verified") : undefined}
          />
          <InputField
            label={t("signup.email.label")}
            placeholder={t("signup.email.placeholder")}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            actionLabel={t("signup.email.checkDuplicate")}
          />
          <InputField
            label={t("signup.password.label")}
            placeholder={t("signup.password.placeholder")}
            value={password}
            onChangeText={setPassword}
            password
          />
          <InputField
            label={t("signup.passwordConfirm.label")}
            placeholder={t("signup.passwordConfirm.placeholder")}
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            password
          />
        </View>

        {/* 약관동의 */}
        <View className="mt-8 gap-6">
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: colors.black[800],
            }}
          >
            {t("signup.agreements.title")}
          </Text>

          {/* 전체 동의 */}
          <View className="flex-row items-center justify-between">
            <Text
              className="text-b6 text-black-800"
              style={{ fontWeight: "600" }}
            >
              {t("signup.agreements.agreeAll")}
            </Text>
            <Checkbox checked={allChecked} onPress={toggleAll} />
          </View>

          <View className="gap-6">
            <AgreementItem
              underlinedPrefix={t("signup.agreements.terms")}
              label={t("signup.agreements.termsSuffix")}
              onPressLabel={() => router.push("/terms" as Href)}
              checked={agreements.terms}
              onPress={() => toggle("terms")}
            />
            <AgreementItem
              label={t("signup.agreements.privacy")}
              checked={agreements.privacy}
              onPress={() => toggle("privacy")}
            />
            <AgreementItem
              label={t("signup.agreements.thirdParty")}
              checked={agreements.thirdParty}
              onPress={() => toggle("thirdParty")}
            />
            <AgreementItem
              label={t("signup.agreements.marketing")}
              checked={agreements.marketing}
              onPress={() => toggle("marketing")}
            />
            <AgreementItem
              label={t("signup.agreements.notification")}
              checked={agreements.notification}
              onPress={() => toggle("notification")}
            />
            <AgreementItem
              label={t("signup.agreements.ads")}
              checked={agreements.ads}
              onPress={() => toggle("ads")}
            />
          </View>
        </View>
      </RNScrollView>

      {/* 하단 고정 버튼 */}
      <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#FFFFFF" }}>
        <View className="px-5 pt-[10px] pb-4">
          <Button>{t("signup.cta")}</Button>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

import { useState } from "react";
import { Image, View as RNView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable } from "@/src/tw";
import { Button } from "@/src/components/Button";
import { TopNav } from "@/src/components/TopNav";
import { InputField } from "@/src/components/InputField";

export default function LoginEmailScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(true);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top", "bottom"]}
    >
      {/* 배경 장식 */}
      <RNView
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
        }}
      >
        <Image
          source={require("@/assets/images/bg_ellipse.png")}
          style={{
            position: "absolute",
            width: 265,
            height: 265,
            top: 70,
            left: -50,
          }}
          resizeMode="contain"
        />
        {/* <Image
          source={require("@/assets/images/deco_circle_1.png")}
          style={{ position: "absolute", width: 63, height: 62, top: 453, left: 20 }}
          resizeMode="contain"
        />
        <Image
          source={require("@/assets/images/deco_circle_2.png")}
          style={{ position: "absolute", width: 87, height: 88, top: 139, right: 0 }}
          resizeMode="contain"
        />
        <Image
          source={require("@/assets/images/deco_circle_3.png")}
          style={{ position: "absolute", width: 79, height: 78, top: 310, left: -20 }}
          resizeMode="contain"
        />
        <Image
          source={require("@/assets/images/deco_circle_4.png")}
          style={{ position: "absolute", width: 112, height: 111, top: 564, right: 0 }}
          resizeMode="contain"
        /> */}
      </RNView>

      <TopNav leftIcon="back" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 px-5">
        {/* 로고 + 태그라인 */}
        <View className="items-center mt-24 gap-3">
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 210, height: 44 }}
            resizeMode="contain"
          />
          <Text className="text-b6 text-black-700 text-center">
            {t("loginEmail.tagline")}
          </Text>
        </View>

        {/* 제목 */}
        {/* <Text
          className="text-black-800 mt-8"
          style={{
            fontSize: 32,
            fontWeight: "600",
            lineHeight: 44,
            letterSpacing: -0.32,
          }}
        >
          로그인
        </Text> */}

        {/* 입력 필드 */}
        <View className="mt-20 gap-[17px]">
          <InputField
            label={t("loginEmail.email.label")}
            value={email}
            onChangeText={setEmail}
            placeholder={t("loginEmail.email.placeholder")}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InputField
            label={t("loginEmail.password.label")}
            value={password}
            onChangeText={setPassword}
            placeholder={t("loginEmail.password.placeholder")}
            password
          />
        </View>

        {/* 자동 로그인 체크박스 */}
        <Pressable
          className="flex-row items-center gap-2 mt-[17px]"
          onPress={() => setAutoLogin(!autoLogin)}
        >
          <View
            className="w-[18px] h-[18px] rounded-[4px] items-center justify-center"
            style={{
              backgroundColor: autoLogin ? "#262C31" : "#FFFFFF",
              borderWidth: 1,
              borderColor: "#262C31",
            }}
          >
            {autoLogin && (
              <Text
                style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "700" }}
              >
                ✓
              </Text>
            )}
          </View>
          <Text className="text-b9 text-black-800">{t("loginEmail.autoLogin")}</Text>
        </Pressable>

        {/* 로그인 버튼 */}
        <Button className="mt-[17px]">{t("loginEmail.cta")}</Button>

        {/* 하단 링크 */}
        <View className="flex-row items-center gap-4 mt-6 mx-20">
          <Pressable>
            <Text className="text-b8 text-black-700">{t("loginEmail.findEmail")}</Text>
          </Pressable>
          <Pressable>
            <Text className="text-b8 text-black-700">{t("loginEmail.findPassword")}</Text>
          </Pressable>
          <Pressable>
            <Text className="text-b8 text-black-700">{t("loginEmail.signup")}</Text>
          </Pressable>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

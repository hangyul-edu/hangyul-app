import { Image, View as RNView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable } from "@/src/tw";
import { Button } from "@/src/components/Button";
import IcGoogle from "@/assets/icons/ic_google.svg";
import IcApple from "@/assets/icons/ic_apple.svg";
import IcFacebook from "@/assets/icons/ic_facebook.svg";
import IcKakao from "@/assets/icons/ic_kakao.svg";
import IcLine from "@/assets/icons/ic_line.svg";

export default function LoginScreen() {
  const { t } = useTranslation();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top", "bottom"]}
    >
      {/* 배경 장식 (절대 위치) */}
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
        {/* 주황 원형 그라데이션 */}
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
        {/* 장식 점선 원 */}
        {/* <Image
          source={require("@/assets/images/deco_circle_1.png")}
          style={{ position: "absolute", width: 63, height: 62, top: 449, left: 22 }}
          resizeMode="contain"
        />
        <Image
          source={require("@/assets/images/deco_circle_2.png")}
          style={{ position: "absolute", width: 87, height: 88, top: 135, right: 0 }}
          resizeMode="contain"
        />
        <Image
          source={require("@/assets/images/deco_circle_3.png")}
          style={{ position: "absolute", width: 79, height: 78, top: 306, left: -18 }}
          resizeMode="contain"
        />
        <Image
          source={require("@/assets/images/deco_circle_4.png")}
          style={{ position: "absolute", width: 112, height: 111, top: 560, right: 0 }}
          resizeMode="contain"
        /> */}
      </RNView>

      {/* 메인 콘텐츠 */}
      <View className="flex-1 items-center justify-center px-5 gap-6">
        {/* 로고 + 태그라인 */}
        <View className="items-center gap-3 mb-10">
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 210, height: 44 }}
            resizeMode="contain"
          />
          <Text className="text-b6 text-black-700 text-center">
            {t("login.tagline")}
          </Text>
        </View>

        {/* 버튼 그룹 */}
        <View className="w-full gap-3">
          <Button onPress={() => router.push("/login-email")}>{t("login.cta")}</Button>
          {/* <Button variant="outline" onPress={() => router.push("/signup")}>
            회원가입
          </Button> */}

          {/* Google */}
          <Pressable
            className="w-full flex-row items-center justify-center py-[14px] rounded-xl bg-white border border-[#C7C7CC]"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <IcGoogle
              width={24}
              height={24}
              style={{ position: "absolute", left: 16 }}
            />
            <Text className="text-b6 text-black-800">{t("login.google")}</Text>
          </Pressable>

          {/* Apple */}
          <Pressable
            className="w-full flex-row items-center justify-center py-[14px] rounded-xl"
            style={{
              backgroundColor: "#000000",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <IcApple
              width={24}
              height={24}
              style={{ position: "absolute", left: 16 }}
            />
            <Text className="text-b6 text-white">{t("login.apple")}</Text>
          </Pressable>
        </View>

        {/* SNS 소셜 버튼 */}
        <View className="flex-row gap-3 mb-8">
          {[
            { Icon: IcFacebook, bg: "#4285F4" },
            { Icon: IcKakao, bg: "#FEE500" },
            { Icon: IcLine, bg: "#06C755" },
          ].map(({ Icon, bg }, index) => (
            <Pressable
              key={index}
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor: bg,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Icon width={25} height={25} />
            </Pressable>
          ))}
        </View>

        {/* 이메일/비밀번호 찾기 */}
        <View className="flex-row items-center gap-4 mt-6 mx-20">
          <Pressable>
            <Text className="text-b8 text-black-700">{t("login.findEmail")}</Text>
          </Pressable>
          <Pressable>
            <Text className="text-b8 text-black-700">{t("login.findPassword")}</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/signup")}>
            <Text className="text-b8 text-black-700">{t("login.signup")}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

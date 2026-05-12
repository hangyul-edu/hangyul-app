import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable } from "@/src/tw";
import { TopNav } from "@/src/components/TopNav";

const PAYMENT_HISTORY = [
  {
    date: "25/11/11",
    description: "한귤 연 구독",
    startDate: "2025/11/11",
    endDate: "2025/03/12",
    amount: "25,000원",
  },
  {
    date: "25/11/11",
    description: "한귤 연 구독",
    startDate: "2025/11/11",
    endDate: "2025/03/12",
    amount: "25,000원",
  },
  {
    date: "25/11/11",
    description: "한귤 연 구독",
    startDate: "2025/11/11",
    endDate: "2025/03/12",
    amount: "25,000원",
  },
  {
    date: "25/11/11",
    description: "한귤 연 구독",
    startDate: "2025/11/11",
    endDate: "2025/03/12",
    amount: "25,000원",
  },
  {
    date: "25/11/11",
    description: "한귤 연 구독",
    startDate: "2025/11/11",
    endDate: "2025/03/12",
    amount: "25,000원",
  },
  {
    date: "25/11/11",
    description: "한귤 연 구독",
    startDate: "2025/11/11",
    endDate: "2025/03/12",
    amount: "25,000원",
  },
  {
    date: "25/11/11",
    description: "한귤 연 구독",
    startDate: "2025/11/11",
    endDate: "2025/03/12",
    amount: "25,000원",
  },
];

export default function SubscriptionScreen() {
  const { t } = useTranslation();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top"]}
    >
      <TopNav leftIcon="back" title={t("subscription.title")} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 내 구독정보 */}
        <View className="px-5 py-6 gap-6 mb-6">
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#262C31" }}>
            {t("subscription.myInfo")}
          </Text>

          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text
                style={{ fontSize: 14, fontWeight: "500", color: "#778088" }}
              >
                {t("subscription.plan")}
              </Text>
              <Text
                style={{ fontSize: 15, fontWeight: "500", color: "#262C31" }}
              >
                일년 구독 5
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text
                style={{ fontSize: 14, fontWeight: "500", color: "#778088" }}
              >
                {t("subscription.nextBillingDate")}
              </Text>
              <Text
                style={{ fontSize: 15, fontWeight: "500", color: "#262C31" }}
              >
                2025년 11월 29일
              </Text>
            </View>

            <Pressable>
              <Text
                style={{ fontSize: 14, fontWeight: "500", color: "#778088" }}
              >
                {t("subscription.cancelNote")}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* 결제 정보 */}
        <View
          style={{ backgroundColor: "rgba(238, 242, 243, 0.4)" }}
          className="px-5 py-6 gap-4"
        >
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#262C31" }}>
            {t("subscription.paymentInfo")}
          </Text>

          {/* 테이블 헤더 */}
          <View
            className="flex-row pb-3"
            style={{ borderBottomWidth: 0.5, borderBottomColor: "#D7DBE0" }}
          >
            <Text
              style={{
                width: 100,
                fontSize: 13,
                fontWeight: "600",
                color: "#778088",
              }}
            >
              {t("subscription.date")}
            </Text>
            <Text
              className="flex-1"
              style={{
                width: 100,
                fontSize: 13,
                fontWeight: "600",
                color: "#778088",
              }}
            >
              {t("subscription.descPeriod")}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: "600", color: "#778088" }}>
              {t("subscription.amount")}
            </Text>
          </View>

          {/* 결제 내역 rows */}
          <View className="gap-6">
            {PAYMENT_HISTORY.map((item, index) => (
              <View key={index} className="flex-row items-start">
                <Text
                  style={{
                    width: 100,
                    fontSize: 12,
                    fontWeight: "500",
                    color: "#778088",
                  }}
                >
                  {item.date}
                </Text>
                <View className="flex-1 gap-[2px]">
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      color: "#778088",
                      marginBottom: 4,
                    }}
                  >
                    {item.description}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      color: "#778088",
                    }}
                  >
                    {item.startDate}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      color: "#778088",
                    }}
                  >
                    - {item.endDate}
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 15, fontWeight: "600", color: "#2C2C2C" }}
                >
                  {item.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

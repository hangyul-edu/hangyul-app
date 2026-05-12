import { View, Text, Pressable } from "@/src/tw";
import { colors } from "@/src/constants/colors";
import ChevronRight from "@/assets/icons/chevron_right.svg";
import IcFreeTrial from "@/assets/icons/ic_free_trial.svg";

type SubscriptionStatus = "free-trial" | "subscribed" | "none";

interface SubscriptionCardProps {
  status: SubscriptionStatus;
  planName?: string;
  nextBillingDate?: string;
  onPress?: () => void;
  className?: string;
}

export const SubscriptionCard = ({
  status,
  planName,
  nextBillingDate,
  onPress,
  className = "",
}: SubscriptionCardProps) => {
  return (
    <View
      className={`rounded-xl px-4 py-[18px] border border-black-200 bg-white ${
        status === "none" ? "gap-2" : "gap-1"
      } ${className}`}
    >
      {/* Label */}
      <Text className="text-c4 text-black-500">이용 구독 플랜</Text>

      {status === "none" ? (
        <>
          {/* 구독 없음 */}
          <Text className="text-h8 text-black-800">
            이용 중인 구독 플랜이 없어요.
          </Text>

          {/* 구독하기 버튼 */}
          <Pressable
            className="items-center justify-center py-[14px] rounded-xl bg-primary-900"
            onPress={onPress}
          >
            <Text className="text-b4 text-white">구독하기</Text>
          </Pressable>
        </>
      ) : (
        <View className="gap-1">
          {/* 배지 (무료체험중) */}
          {status === "free-trial" && (
            <IcFreeTrial width={80} height={24} />
          )}

          {/* 플랜명 + 화살표 */}
          <Pressable className="flex-row items-center gap-0.5" onPress={onPress}>
            <Text className="text-h8 text-black-800">{planName}</Text>
            <ChevronRight color={colors.black[800]} width={16} height={16} />
          </Pressable>

          {/* 다음 결제일 */}
          {nextBillingDate && (
            <View className="flex-row gap-2.5">
              <Text className="text-b9 text-black-600">다음 결제일</Text>
              <Text className="text-b9 text-black-600">{nextBillingDate}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

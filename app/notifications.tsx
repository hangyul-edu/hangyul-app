import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { TopNav } from "@/src/components/TopNav";
import { NotificationList, NotificationItem } from "@/src/components/NotificationList";

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "[새 강의] 'TOPIK 문법 특강' 새로운 강의가 오픈되었습니다.",
    date: "25.11.25",
    content: "새로운 TOPIK 문법 특강 강의가 오픈되었습니다. 지금 바로 수강을 시작해보세요. 해당 강의는 TOPIK II 3~4급 수준으로 구성되어 있으며, 실전 문제 유형과 핵심 문법을 집중적으로 다룹니다.",
    isRead: false,
  },
  {
    id: "2",
    title: "[학습 시작 알림] 오늘 학습 목표 50%를 달성했어요! 남은 목표를 확인해 보세요.",
    date: "25.11.20",
    content: "오늘의 학습 목표를 50% 달성했습니다. 남은 목표를 완료하면 연속 학습 기록이 갱신됩니다. 지금 바로 이어서 학습해보세요!",
    isRead: true,
  },
  {
    id: "3",
    title: "[퀴즈 결과] '초급 어휘 1주차 퀴즈' 결과가 나왔습니다. 10문제 중 8개 정답!",
    date: "25.11.01",
    content: "'초급 어휘 1주차 퀴즈' 결과: 10문제 중 8개 정답 (80점). 틀린 문제를 다시 확인하고 복습해보세요.",
    isRead: true,
  },
  {
    id: "4",
    title: "[복습 알림] 3일 전에 배운 '존댓말 표현' 복습할 시간이에요!",
    date: "25.10.29",
    content: "3일 전에 학습한 '존댓말 표현'을 복습할 시간입니다. 복습을 통해 기억을 더 오래 유지하세요.",
    isRead: true,
  },
  {
    id: "5",
    title: "[필독] 학습자료 보강 및 시스템 업데이트 안내",
    date: "25.10.21",
    content: "안녕하세요, 한귤 서비스입니다.\n\n더 나은 학습 경험을 위해 학습자료 보강 및 시스템 업데이트를 진행합니다.\n\n■ 업데이트 일시: 2025년 10월 22일 (수) 02:00 ~ 04:00\n■ 주요 변경사항\n- 초급 어휘 콘텐츠 30개 추가\n- 발음 기능 개선\n- 오답 노트 자동 저장 기능 추가\n\n업데이트 시간 동안 서비스 이용이 일시 중단될 수 있습니다. 양해 부탁드립니다.",
    isRead: true,
  },
  {
    id: "6",
    title: "[출석 이벤트] 7일 연속 출석 달성! 보상 포인트를 확인하세요.",
    date: "25.06.05",
    content: "7일 연속 출석을 달성하셨습니다! 보상으로 포인트 500점이 지급되었습니다. 포인트는 프리미엄 콘텐츠 이용 시 사용할 수 있습니다.",
    isRead: true,
  },
  {
    id: "7",
    title: "[공지] 시스템 안정화를 위한 정기 점검이 잠시 후 진행될 예정입니다.",
    date: "25.05.05",
    content: "시스템 안정화를 위한 정기 점검이 예정되어 있습니다.\n\n■ 점검 일시: 2025년 5월 5일 (월) 03:00 ~ 05:00\n\n점검 시간 동안 서비스 이용이 제한됩니다. 이용에 불편을 드려 죄송합니다.",
    isRead: true,
  },
];

export default function NotificationsScreen() {
  const { t } = useTranslation();

  const handlePress = (item: NotificationItem) => {
    router.push({
      pathname: "/notice-detail",
      params: { title: item.title, date: item.date, content: item.content ?? "" },
    } as any);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
      <TopNav leftIcon="back" title={t("notifications.title")} />
      <NotificationList data={NOTIFICATIONS} onPressItem={handlePress} />
    </SafeAreaView>
  );
}

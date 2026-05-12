import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { TopNav } from "@/src/components/TopNav";
import { NotificationList, NotificationItem } from "@/src/components/NotificationList";

const ANNOUNCEMENTS: NotificationItem[] = [
  {
    id: "1",
    title: "한귤 앱 신규 버전 업데이트 안내",
    date: "25.11.25",
    content: "안녕하세요, 한귤 서비스입니다.\n\n더 편리하고 풍부한 학습 경험을 위해 앱을 업데이트했습니다.\n\n■ 주요 변경사항\n- UI/UX 전면 개편\n- 발음 연습 기능 추가\n- 오답 노트 자동 저장\n- 학습 통계 화면 개선\n\n최신 버전으로 업데이트 후 이용해 주세요.",
    isRead: false,
  },
  {
    id: "2",
    title: "11월 출석 이벤트 시작! 포인트 받아가세요",
    date: "25.11.01",
    content: "11월 한 달간 출석 이벤트를 진행합니다!\n\n■ 이벤트 기간: 2025년 11월 1일 ~ 11월 30일\n■ 혜택: 7일 연속 출석 시 포인트 500점 지급\n\n매일 접속하여 포인트를 모아보세요.",
    isRead: true,
  },
  {
    id: "3",
    title: "친구 초대 이벤트 오픈 안내",
    date: "25.10.29",
    content: "친구를 초대하면 두 분 모두에게 혜택이 돌아갑니다!\n\n■ 혜택: 초대한 분 포인트 300점, 초대받은 분 포인트 200점 지급\n■ 이벤트 기간: 상시\n\n마이페이지 > 친구 추천 설정에서 초대 링크를 확인하세요.",
    isRead: true,
  },
  {
    id: "4",
    title: "한귤 첫 가입 혜택 제공 안내",
    date: "25.10.20",
    content: "한귤에 처음 가입하신 분들께 특별 혜택을 드립니다.\n\n■ 혜택: 7일 무료 프리미엄 이용권 자동 지급\n\n가입 후 자동으로 적용되니 별도 신청이 필요하지 않습니다.",
    isRead: true,
  },
  {
    id: "5",
    title: "여행 한국어 코스 업데이트",
    date: "25.10.10",
    content: "여행 한국어 코스가 업데이트되었습니다.\n\n■ 추가 콘텐츠\n- 공항/교통 편 20개\n- 식당/카페 편 15개\n- 쇼핑 편 10개\n\n새로운 콘텐츠로 더욱 풍부하게 학습해보세요.",
    isRead: true,
  },
  {
    id: "6",
    title: "학습 문장 발음 기능 개선 안내",
    date: "25.10.09",
    content: "학습 문장 발음 기능이 개선되었습니다.\n\n보다 자연스러운 원어민 발음으로 업데이트되었으며, 속도 조절 기능도 추가되었습니다. 천천히 들으며 따라 말해보세요.",
    isRead: true,
  },
  {
    id: "7",
    title: "개인정보 처리방침 변경 안내",
    date: "25.10.02",
    content: "2025년 10월 15일부터 개인정보 처리방침이 변경됩니다.\n\n주요 변경 내용은 앱 내 약관 및 정책 메뉴에서 확인하실 수 있습니다. 변경된 방침에 동의하지 않으실 경우 서비스 탈퇴가 가능합니다.",
    isRead: true,
  },
  {
    id: "8",
    title: "오답 문장 자동 저장 기능 추가",
    date: "25.09.10",
    content: "퀴즈에서 틀린 문장이 자동으로 오답 노트에 저장되는 기능이 추가되었습니다.\n\n마이페이지 > 저장한 콘텐츠에서 오답 문장을 다시 복습할 수 있습니다.",
    isRead: true,
  },
];

export default function AnnouncementsScreen() {
  const { t } = useTranslation();

  const handlePress = (item: NotificationItem) => {
    router.push({
      pathname: "/notice-detail",
      params: { title: item.title, date: item.date, content: item.content ?? "" },
    } as any);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
      <TopNav leftIcon="back" title={t("announcements.title")} />
      <NotificationList data={ANNOUNCEMENTS} accentColor="#66CCCC" onPressItem={handlePress} />
    </SafeAreaView>
  );
}

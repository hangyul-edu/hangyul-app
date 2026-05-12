import { ScrollView as RNScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "@/src/tw";
import { TopNav } from "@/src/components/TopNav";

const SECTIONS = [
  {
    title: "제1조 목적",
    content:
      "본 약관은 이용자가 한귤 서비스를 이용함에 있어, 회사와 이용자 간의 기본적인 이용 조건 및 절차를 명확히 하는 것을 목적으로 합니다.",
  },
  {
    title: "제2조 서비스 정의",
    content:
      "한귤은 한국어 학습을 위한 콘텐츠 제공, 학습 기록 관리, 학습자 간 소통 기능 등을 제공하는 모바일 애플리케이션 서비스입니다.",
  },
  {
    title: "제3조 약관의 효력 및 변경",
    content:
      "본 약관은 앱 내 고지 또는 회사가 정한 방법을 통해 이용자에게 공지함으로써 효력이 발생합니다.\n\n회사는 필요한 경우 약관을 변경할 수 있으며, 변경 사항은 사전에 고지합니다. 변경된 약관에 동의하지 않을 경우 이용자는 서비스 이용을 중단할 수 있습니다.",
  },
  {
    title: "제4조 이용자의 의무",
    content:
      "이용자는 관련 법령, 본 약관 및 서비스 이용 안내를 준수해야 합니다.\n\n서비스 내 제공되는 콘텐츠를 무단으로 복제, 배포, 수정하거나 상업적으로 이용하는 것을 금합니다.",
  },
  {
    title: "제5조 서비스 이용 제한",
    content:
      "회사는 이용자가 본 약관을 위반하거나 서비스의 정상적인 운영을 방해하는 경우, 사전 통보 없이 서비스 이용을 제한할 수 있습니다.",
  },
  {
    title: "제6조 면책 조항",
    content:
      "회사는 천재지변, 전쟁, 기타 불가항력적 사유로 인해 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.\n\n이용자의 귀책 사유로 인한 서비스 이용 장애에 대해 회사는 책임을 지지 않습니다.",
  },
  {
    title: "제7조 준거법 및 관할법원",
    content:
      "본 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련한 분쟁은 회사의 본사 소재지를 관할하는 법원을 제1심 관할법원으로 합니다.",
  },
];

export default function TermsScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top"]}
    >
      <TopNav leftIcon="back" />

      <RNScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        <Text className="text-h1 text-black-800 mt-6 mb-6">
          한귤 서비스 이용약관
        </Text>

        {SECTIONS.map((section) => (
          <View key={section.title} className="mb-5 gap-2">
            <Text className="text-b8 text-black-800">{section.title}</Text>
            <Text className="text-c4 text-black-700">{section.content}</Text>
          </View>
        ))}
      </RNScrollView>
    </SafeAreaView>
  );
}

import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/typography";
import HomeIcon from "@/assets/icons/home.svg";
import ContentsIcon from "@/assets/icons/contents.svg";
import FlagIcon from "@/assets/icons/flag.svg";
import AwardIcon from "@/assets/icons/award.svg";
import MoreIcon from "@/assets/icons/more.svg";

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary[900],
        tabBarInactiveTintColor: colors.black[500],
        tabBarStyle: {
          height: 88,
          backgroundColor: colors.black[100],
          borderTopWidth: 0.5,
          borderTopColor: colors.black[400],
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontFamily: typography.c4.fontFamily,
          fontSize: typography.c4.fontSize,
          fontWeight: typography.c4.fontWeight,
          marginTop: 3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.home"),
          tabBarIcon: ({ color, size }) => (
            <HomeIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="course"
        options={{
          title: t("tabs.course"),
          tabBarIcon: ({ color, size }) => (
            <ContentsIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sentence"
        options={{
          title: t("tabs.sentence"),
          tabBarIcon: ({ color, size }) => (
            <FlagIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: t("tabs.ranking"),
          tabBarIcon: ({ color, size }) => (
            <AwardIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: t("tabs.more"),
          tabBarIcon: ({ color, size }) => (
            <MoreIcon width={size} height={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

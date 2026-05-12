import { useState, useCallback, useRef } from "react";
import { FlatList, ViewToken } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable } from "@/src/tw";
import { Tabs } from "@/src/components/Tabs";
import { RankingItem } from "@/src/components/RankingItem";

interface RankEntry {
  id: string;
  rank: number;
  name: string;
  level: string;
  points: string;
  isMe?: boolean;
}

const LEAGUE_DATA: RankEntry[] = [
  { id: "1", rank: 1, name: "Hai", level: "학습레벨 14", points: "2000P" },
  { id: "2", rank: 2, name: "Hoa", level: "학습레벨 12", points: "1000P" },
  { id: "3", rank: 3, name: "Beam", level: "학습레벨 11", points: "500P" },
  {
    id: "4",
    rank: 4,
    name: "유저 닉네임",
    level: "학습레벨 10",
    points: "300P",
    isMe: true,
  },
  {
    id: "5",
    rank: 5,
    name: "유저 닉네임",
    level: "학습레벨 10",
    points: "200P",
  },
  {
    id: "6",
    rank: 6,
    name: "유저 닉네임",
    level: "학습레벨 9",
    points: "150P",
  },
  {
    id: "7",
    rank: 7,
    name: "유저 닉네임",
    level: "학습레벨 8",
    points: "100P",
  },
  { id: "8", rank: 8, name: "유저 닉네임", level: "학습레벨 7", points: "80P" },
  { id: "9", rank: 9, name: "유저 닉네임", level: "학습레벨 6", points: "60P" },
  {
    id: "10",
    rank: 10,
    name: "유저 닉네임",
    level: "학습레벨 5",
    points: "40P",
  },
  {
    id: "11",
    rank: 11,
    name: "유저 닉네임",
    level: "학습레벨 3",
    points: "30P",
  },
  {
    id: "12",
    rank: 12,
    name: "유저 닉네임",
    level: "학습레벨 3",
    points: "20P",
  },
  {
    id: "13",
    rank: 13,
    name: "유저 닉네임",
    level: "학습레벨 3",
    points: "10P",
  },
  {
    id: "14",
    rank: 14,
    name: "유저 닉네임",
    level: "학습레벨 3",
    points: "10P",
  },
];

const FRIEND_DATA: RankEntry[] = [
  { id: "1", rank: 1, name: "친구1", level: "학습레벨 10", points: "1500P" },
  { id: "2", rank: 2, name: "친구2", level: "학습레벨 8", points: "800P" },
  { id: "3", rank: 3, name: "친구3", level: "학습레벨 7", points: "400P" },
  {
    id: "4",
    rank: 4,
    name: "유저 닉네임",
    level: "학습레벨 6",
    points: "300P",
    isMe: true,
  },
];

const MY_ENTRY = LEAGUE_DATA.find((item) => item.isMe)!;

function AchievementBanner() {
  return (
    <View
      className="mx-5 mb-4 rounded-2xl bg-white px-4 py-4 gap-2"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View
        className="self-start px-3 py-1 rounded-full"
        style={{ backgroundColor: "#262C31" }}
      >
        <Text style={{ fontSize: 12, fontWeight: "700", color: "#FFFFFF" }}>
          7일 연속 공부중 🎉
        </Text>
      </View>
      <Text style={{ fontSize: 14, fontWeight: "600", color: "#FF6700" }}>
        잘했어요!
      </Text>
      <Text style={{ fontSize: 14, fontWeight: "500", color: "#778088" }}>
        학습레벨 10 리그 TOP 100 안에 진입했어요.
      </Text>
      <View
        className="self-start px-3 py-1 rounded-full"
        style={{ backgroundColor: "#FF6700" }}
      >
        <Text style={{ fontSize: 13, fontWeight: "700", color: "#FFFFFF" }}>
          300P
        </Text>
      </View>
    </View>
  );
}

function TableHeader({ t }: { t: (key: string) => string }) {
  return (
    <View className="flex-row items-center px-5 py-3">
      <View style={{ width: 48 }}>
        <Text style={{ fontSize: 13, fontWeight: "600", color: "#778088" }}>
          {t("ranking.columnRank")}
        </Text>
      </View>
      <Text
        style={{
          width: 140,
          marginLeft: 12,
          fontSize: 13,
          fontWeight: "600",
          color: "#778088",
        }}
      >
        {t("ranking.columnUser")}
      </Text>
      <Text style={{ fontSize: 13, fontWeight: "600", color: "#778088" }}>
        {t("ranking.columnPoints")}
      </Text>
    </View>
  );
}

export default function RankingScreen() {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);
  const [isMyRowVisible, setIsMyRowVisible] = useState(false);
  const data = tabIndex === 0 ? LEAGUE_DATA : FRIEND_DATA;
  const myEntry = tabIndex === 0 ? MY_ENTRY : FRIEND_DATA.find((i) => i.isMe);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setIsMyRowVisible(viewableItems.some((v) => v.item?.isMe === true));
    },
    [],
  );

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      edges={["top"]}
    >
      {/* 탭 */}
      <View
        className="flex-row items-center bg-white"
        style={{ borderBottomWidth: 1, borderBottomColor: "#DBDDDF" }}
      >
        <Tabs
          tabs={[t("ranking.leagueTab"), t("ranking.friendTab")]}
          activeIndex={tabIndex}
          onChange={setTabIndex}
          align="start"
        />
        {tabIndex === 1 && (
          <View className="flex-1 items-end pr-5 pb-1">
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: "#DBDDDF",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              <Text
                style={{ fontSize: 13, fontWeight: "500", color: "#262C31" }}
              >
                {t("ranking.manageFriends")}
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* 성취 배너 */}
      <View className="pt-4">{/* <AchievementBanner /> */}</View>

      {/* 랭킹 리스트 */}
      <View className="flex-1 bg-white">
        <TableHeader t={t} />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RankingItem
              rank={item.rank}
              name={item.name}
              level={item.level}
              points={item.points}
              isMe={item.isMe}
            />
          )}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig.current}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 0.5,
                backgroundColor: "#F4F6F6",
                marginHorizontal: 20,
              }}
            />
          )}
        />
      </View>

      {/* Sticky 내 순위 (내 행이 화면에 없을 때만 표시) */}
      {myEntry && !isMyRowVisible && (
        <RankingItem
          rank={myEntry.rank}
          name={myEntry.name}
          level={myEntry.level}
          points={myEntry.points}
          isMe
          highlighted
        />
      )}
    </SafeAreaView>
  );
}

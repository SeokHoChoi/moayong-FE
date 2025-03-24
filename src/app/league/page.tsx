"use client";

import { BottomNav } from "src/_components/BottomNav";
import { LeagueCharacterList } from "./_components/LeagueCharacterList";
import { RankListItem } from "./_components/RankListItem";
import { useAuth } from "src/_hooks/auth";
import { useQuery } from "@tanstack/react-query";
import { getLeague, getMembersByLeagueId, getMemberRankingByLeagueId } from "src/_api/api";

const LeaguePage = () => {
  const { user } = useAuth();

  const { data: league } = useQuery({
    queryKey: ["league"],
    queryFn: () => getLeague(user?.id),
    enabled: !!user?.id,
  });
  console.log("league", league);

  const { data: leagueMembers } = useQuery({
    queryKey: ["members"],
    queryFn: () => getMemberRankingByLeagueId(league?.seasonId),
    enabled: !!league?.id,
  });

  if (!league && !leagueMembers) return <div>Loading...</div>;
  return (
    <div className="flex flex-col h-screen">
      <header className=" rounded-b-2xl bg-gray-5 ">
        <div className="flex flex-col pb-10">
          <div className="px-5 py-3 border-b border-gray-10">
            <span className="title-sm text-gray-80">나의 리그</span>
          </div>
          <div className="text-gray-80 pt-6 px-5">
            <div className="title-xs text-green-70">{league?.name} 리그</div>
            <div className="title-sm">
              상위 <span className="text-green-70">30%</span>는 다음 리그로 진출할 수 있어요!
            </div>
          </div>
          {/* 용 이미지 스크롤 */}
          <LeagueCharacterList className="px-5 scrollbar-hide" selectedLevel={league?.level} />
        </div>
      </header>

      <section className="p-5 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
        {leagueMembers?.map((member, index) => (
          <RankListItem
            isActive={member.userId === user?.id}
            leagueMember={member}
            rank={index + 1}
            key={member.memberId}
          />
        ))}
      </section>
      <BottomNav />
    </div>
  );
};

export default LeaguePage;

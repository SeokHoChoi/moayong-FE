"use client";

import { LeagueCharacterList } from "./_components/LeagueCharacterList";
import { RankListItem } from "./_components/RankListItem";
import { mockData } from "./_mock/mock";

const LeaguePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className=" rounded-b-2xl bg-gray-5 ">
        <div className="flex flex-col pb-10">
          <div className="px-5 py-3 border-b border-gray-10">
            <span className="title-sm text-gray-80">나의 리그</span>
          </div>
          <div className="text-gray-80 pt-6 px-5">
            <div className="title-xs text-green-70">아기용 리그</div>
            <div className="title-sm">
              상위 <span className="text-green-70">30%</span>는 다음 리그로 진출할 수 있어요!
            </div>
          </div>
          {/* 용 이미지 스크롤 */}
          <LeagueCharacterList className="px-5 scrollbar-hide" selectedLevel={2} />
        </div>
      </header>

      <section className="p-5 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
        {mockData.map((memberRank, index) => (
          <RankListItem
            isActive={memberRank.userId === 3}
            leagueMember={memberRank}
            rank={index + 1}
            key={memberRank.id}
          />
        ))}
      </section>
    </div>
  );
};

export default LeaguePage;

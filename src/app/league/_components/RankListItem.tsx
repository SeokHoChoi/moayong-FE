import { cn } from "src/_lib/utils";
import { Badge } from "src/components/common/Badge";
import { MemberRankingResponse, PromotionStatus } from "src/_types/type";
import { badgeBgColor, badgeTextColor, bgColor, promotionText } from "src/_lib/rank";

interface RankListItemProps {
  isActive: boolean;
  leagueMember: MemberRankingResponse;
  rank: number;
}

export const RankListItem = ({ isActive, leagueMember, rank }: RankListItemProps) => {
  return (
    <div
      className={cn(
        "flex justify-between rounded-2xl px-4 py-5",
        isActive && bgColor[leagueMember.promotionStatus]
      )}
      key={leagueMember.memberId}
    >
      <div className="flex gap-2 items-center flex-1">
        <div className="label-md bg-gray-50 text-white w-6 h-6 flex items-center justify-center rounded-lg">
          {rank}
        </div>
        <div className="flex gap-1 flex-1 items-center">
          <div className="body-sm text-gray-80">{leagueMember.nickname}</div>
          {isActive && (
            <div className="flex gap-1">
              <Badge variant={badgeBgColor[leagueMember.promotionStatus]}>
                {promotionText[leagueMember.promotionStatus]}
              </Badge>
              <Badge variant={badgeTextColor[leagueMember.promotionStatus]}>
                상위 {leagueMember.rate}%
              </Badge>
            </div>
          )}
        </div>
      </div>
      <div className="body-sm text-gray-50">{leagueMember.totalScore}P</div>
    </div>
  );
};

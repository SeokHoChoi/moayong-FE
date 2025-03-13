import { cn } from "src/_lib/utils";
import { Badge } from "src/components/common/Badge";
import { LeagueMemberResponse } from "src/_types/type";

interface RankListItemProps {
  isActive: boolean;
  leagueMember: LeagueMemberResponse;
  rank: number;
}
export const RankListItem = ({ isActive, leagueMember, rank }: RankListItemProps) => {
  return (
    <div
      className={cn("flex justify-between rounded-2xl px-4 py-5", isActive && "bg-purple-5")}
      key={leagueMember.id}
    >
      <div className="flex gap-2 items-center flex-1">
        <div className="label-md bg-gray-50 text-white w-6 h-6 flex items-center justify-center rounded-lg">
          {rank}
        </div>
        <div className="flex gap-1 flex-1 items-center">
          <div className="body-sm text-gray-80">{leagueMember.username}</div>
          {isActive && (
            <div className="flex gap-1">
              <Badge variant="purpleBg">등급유지</Badge>
              <Badge variant="purpleText">상위 40%</Badge>
            </div>
          )}
        </div>
      </div>
      <div className="body-sm text-gray-50">{leagueMember.totalScore}P</div>
    </div>
  );
};

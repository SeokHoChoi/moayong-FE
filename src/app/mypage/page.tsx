"use client";

import { CalendarIcon, FlameIcon, MedalIcon, CoinIcon } from "src/components/common/Icons";
import { StatCard } from "./_components/StatCard";
import { MenuItem } from "./_components/MenuItem";
import { BottomNav } from "../../_components/BottomNav";
import { useAuth } from "src/_hooks/auth";
import {
  getConsecutiveAttendance,
  getLeague,
  getMatch,
  getTotalAmountByUserId,
} from "src/_api/api";
import { useQuery } from "@tanstack/react-query";

const memberMenus = [
  { href: "/mypage/profile", label: "나의 정보 수정" },
  { href: "/mypage/account", label: "내 통장 수정" },
];

const serviceMenus = [
  { href: "/terms", label: "이용약관" },
  { href: "/privacy", label: "개인정보처리방침" },
];

export default function MyPage() {
  const { user } = useAuth();

  // 연속 출석일
  const { data: consecutiveAttendance } = useQuery({
    queryKey: ["consecutiveAttendance"],
    queryFn: () => getConsecutiveAttendance(user?.id),
    enabled: !!user,
  });

  // 누적 저축 금액
  const { data: totalAmount } = useQuery({
    queryKey: ["totalAmount"],
    queryFn: () => getTotalAmountByUserId(user?.id),
    enabled: !!user,
  });

  // 리그
  const { data: league } = useQuery({
    queryKey: ["league"],
    queryFn: () => getLeague(user?.id),
    enabled: !!user,
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div>
        <div className="flex-1 bg-[#F4F5F6] rounded-b-2xl">
          <h1 className="title-sm py-3 px-5 border-b border-bray-10">마이페이지</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 px-5 py-6">
            <StatCard
              icon={<CalendarIcon />}
              label="연속 출석일"
              value={consecutiveAttendance?.currentConsecutiveDate}
              unit="일"
              iconColor="text-green-600"
            />
            <StatCard
              icon={<FlameIcon />}
              label="최대 연속 출석일"
              value={consecutiveAttendance?.maxConsecutiveDate}
              unit="일"
              valueColor="text-danger"
            />
            <StatCard
              icon={<CoinIcon />}
              label="누적 저축 금액"
              value={totalAmount?.toLocaleString()}
              unit="원"
              valueColor="text-gray-80"
            />
            <StatCard
              icon={<MedalIcon />}
              label="현재 리그"
              value={league?.name}
              valueColor="text-gray-80"
            />
          </div>
        </div>

        {/* Menu Lists */}
        <div className="flex flex-col px-5 pt-5">
          <section>
            <h2 className="title-xs text-gray-50 mb-3">회원 정보 수정</h2>
            {memberMenus.map((menu, index) => (
              <MenuItem key={index} {...menu} />
            ))}
          </section>

          <section className="mt-8">
            <h2 className="title-xs text-gray-50 mb-3">서비스 이용 안내</h2>
            {serviceMenus.map((menu, index) => (
              <MenuItem key={index} {...menu} />
            ))}
          </section>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

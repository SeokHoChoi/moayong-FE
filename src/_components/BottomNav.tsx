import Link from "next/link";
import { HomeIcon } from "./icons/Home";
import { TrophyIcon } from "./icons/Trophy";
import { PersonIcon } from "./icons/Person";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const navItems = [
  { href: "/", icon: <HomeIcon />, label: "홈" },
  { href: "/league", icon: <TrophyIcon />, label: "나의 리그" },
  { href: "/mypage", icon: <PersonIcon />, label: "마이" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-between items-center py-2 px-10">
        <NavItem
          href="/"
          icon={<HomeIcon selected={pathname === "/"} />}
          label="홈"
          isActive={pathname === "/"}
        />
        <NavItem
          href="/league"
          icon={<TrophyIcon selected={pathname === "/league"} />}
          label="나의 리그"
          isActive={pathname === "/league"}
        />
        <NavItem
          href="/mypage"
          icon={<PersonIcon selected={pathname === "/mypage"} />}
          label="마이"
          isActive={pathname === "/mypage"}
        />
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, isActive = false }: NavItemProps) {
  const colorClass = isActive ? "text-gray-90" : "text-gray-50";

  return (
    <Link href={href} className="flex flex-col items-center gap-1">
      <div className={colorClass}>{icon}</div>
      <span className={`text-xs ${colorClass}`}>{label}</span>
    </Link>
  );
}

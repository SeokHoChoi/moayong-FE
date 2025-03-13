import { ImageCard } from "./ImageCard";

import Level2Img from "src/assets/images/character/level2.png";
import Level3Img from "src/assets/images/character/level3.png";
import Level4Img from "src/assets/images/character/level4-1.png";
import Level5Img from "src/assets/images/character/level5.png";
import Level6Img from "src/assets/images/character/level6.png";
import LockImg from "src/assets/images/character/locked.png";
import { StaticImageData } from "next/image";
import { cn } from "src/lib/utils";
import { ImageCardActive } from "./ImageCardActive";

const levelCharacters: {
  level: number;
  image: StaticImageData;
  name: string;
  className?: string;
}[] = [
  // { level: 1, image: Level1Img, name: "알" },
  { level: 1, image: Level2Img, name: "알" },
  { level: 2, image: Level3Img, name: "아기용" },
  { level: 3, image: Level4Img, name: "용4" },
  { level: 4, image: Level5Img, name: "용5" },
  { level: 5, image: Level6Img, name: "용6", className: "w-[105px] h-[180px]" },
];

export const LeagueCharacterList = ({
  className,
  selectedLevel,
}: {
  className?: string;
  selectedLevel: number;
}) => {
  return (
    <div className={cn("flex gap-3 overflow-x-auto flex-nowrap pt-9", className)}>
      {levelCharacters.map((character) => {
        if (character.level === selectedLevel) {
          return (
            <ImageCardActive
              key={character.level}
              level={character.level}
              image={character.image}
              name={character.name}
              className={cn("flex-shrink-0", character.className)}
            />
          );
        } else if (character.level < selectedLevel) {
          return (
            <ImageCard
              key={character.level}
              level={character.level}
              image={character.image}
              name={character.name}
              className="flex-shrink-0"
            />
          );
        } else {
          return (
            <ImageCard
              key={character.level}
              level={character.level}
              image={LockImg}
              name={"잠금"}
              className="flex-shrink-0"
            />
          );
        }
      })}
    </div>
  );
};

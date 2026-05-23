import { CartoonPhilosopher } from "./CartoonPhilosopher";
import { ChillCloud } from "./ChillCloud";
import { DeadlineMonster } from "./DeadlineMonster";
import { MeaningVoid } from "./MeaningVoid";
import { SocietyPyramid } from "./SocietyPyramid";

type IllustrationProps = {
  illustrationKey?: string;
  className?: string;
};

export function Illustration({ illustrationKey = "cartoon_philosopher", className = "" }: IllustrationProps) {
  if (illustrationKey === "deadline_monster") return <DeadlineMonster className={className} />;
  if (illustrationKey === "chill_cloud") return <ChillCloud className={className} />;
  if (illustrationKey === "society_pyramid") return <SocietyPyramid className={className} />;
  if (illustrationKey === "meaning_void") return <MeaningVoid className={className} />;
  return <CartoonPhilosopher className={className} />;
}

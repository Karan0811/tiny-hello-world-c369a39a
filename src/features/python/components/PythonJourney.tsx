import { History, PlayCircle, Sparkles } from "lucide-react";
import { JourneyCard } from "@/features/learning/components";

export function PythonJourney() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <JourneyCard
        icon={PlayCircle}
        eyebrow="Continue learning"
        title="Pick up where you left off"
        description="Your active Python lesson will appear here as you progress."
        cta={{ label: "Resume" }}
      />
      <JourneyCard
        icon={Sparkles}
        eyebrow="Recommended next"
        title="Your next module"
        description="Suggestions surface here based on prerequisites and history."
        cta={{ label: "Preview" }}
      />
      <JourneyCard
        icon={History}
        eyebrow="Recently visited"
        title="Recent activity"
        description="Lessons and modules you visited recently will appear here."
      />
    </div>
  );
}

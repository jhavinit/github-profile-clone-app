import { useState } from "react";
import PinnedRepos from "./PinnedRepos";
import ContributionGraph from "./ContributionGraph";
import ActivityOverview from "./ActivityOverview";
import ContributionActivity from "./ContributionActivity";

interface ProfileContentProps {
  activeTab: string;
  username: string;
}

const ProfileContent = ({ activeTab, username }: ProfileContentProps) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = Array.from({ length: 13 }).map((_, i) => currentYear - i);

  if (activeTab !== "overview") {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Tab
          </h3>
          <p className="text-muted-foreground">
            Content for this tab is not yet implemented
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PinnedRepos username={username} />


      <div className="md:hidden">
        <select
          className="border rounded px-3 py-2 text-sm bg-background text-foreground"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-6">

        <div className="flex-1 flex flex-col gap-6">
          <ContributionGraph username={username} year={selectedYear} />
          {/* <ActivityOverview username={username} /> */}
          <ContributionActivity username={username} year={selectedYear} />
        </div>

        <div className="hidden md:flex w-20 flex-col items-end pt-2">

          <div className="flex flex-col gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`text-sm px-3 py-1 rounded transition-all
                  ${selectedYear === year
                    ? "bg-[#0969da] text-white font-semibold w-16"
                    : "text-muted-foreground hover:bg-muted w-14"
                  }
                `}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileContent;

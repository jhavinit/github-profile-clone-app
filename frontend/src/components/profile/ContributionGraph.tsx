import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { fetchContributionsAPI } from "@/services/apiService";
import ActivityOverview from "./ActivityOverview";
import { ContributionsResponse } from "@/services/apiService";

interface ContributionGraphProps {
  username: string;
  year?: number;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const ContributionGraph = ({ username, year = new Date().getFullYear() }: ContributionGraphProps) => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);

  const getLevel = (count: number) => {
    if (count === 0) return 0;
    if (count < 3) return 1;
    if (count < 6) return 2;
    if (count < 10) return 3;
    return 4;
  };

  useEffect(() => {
    const from = `${year}-01-01T00:00:00Z`;
    const to = `${year}-12-31T23:59:59Z`;

    const fetchContributions = async () => {
      try {
        const data: ContributionsResponse = await fetchContributionsAPI(username, from, to);
        const weeks = data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];

        const flat: ContributionDay[] = [];
        weeks.forEach((week: { contributionDays: { date: string, contributionCount: number }[] }) =>
          week.contributionDays.forEach((d: { date: string, contributionCount: number }) =>
            flat.push({
              date: d.date,
              count: d.contributionCount,
              level: getLevel(d.contributionCount),
            })
          )
        );

        setContributions(flat);
        setTotalContributions(flat.reduce((sum, d) => sum + d.count, 0));
      } catch (err) {
        console.error(err);
      }
    };

    fetchContributions();
  }, [username, year]);

  const getColor = (level: number) => {
    const colors = [
      "bg-muted",
      "bg-green-200 dark:bg-green-900",
      "bg-green-400 dark:bg-green-700",
      "bg-green-600 dark:bg-green-500",
      "bg-green-800 dark:bg-green-300",
    ];
    return colors[level];
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Mon", "Wed", "Fri"];

  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  contributions.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === contributions.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  return (
    <>
      <p className="text-md text-foreground">
        {totalContributions.toLocaleString("en-US")} contributions in {year}
      </p>

      <Card className="p-0">

        <div className="p-4">
          <div className="overflow-x-auto">
            <div className="inline-flex flex-col gap-1 min-w-full">

              <div className="flex gap-1 ml-8 mb-2">
                {months.map((m) => (
                  <div key={m} className="text-xs text-muted-foreground w-12 text-center">
                    {m}
                  </div>
                ))}
              </div>

              <div className="flex gap-1">
                <div className="flex flex-col gap-1 justify-around w-8">
                  {days.map((day) => (
                    <div key={day} className="text-xs text-muted-foreground h-3 flex items-center">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="flex gap-1 flex-1">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1 flex-1">
                      {Array.from({ length: 7 }).map((_, dayIndex) => {
                        const day = week[dayIndex];
                        return (
                          <div
                            key={dayIndex}
                            className={`h-3 rounded-sm ${day ? getColor(day.level) : "bg-muted"}`}
                            title={day ? `${day.count} contributions on ${day.date}` : "No data"}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <a href="#" className="hover:text-primary hover:underline">
                  Learn how we count contributions
                </a>
                <div className="flex items-center gap-2">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div key={level} className={`h-3 w-3 rounded-sm ${getColor(level)}`} />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#d0d7de]" />

        <ActivityOverview username={username} />

      </Card>
    </>
  );
};

export default ContributionGraph;

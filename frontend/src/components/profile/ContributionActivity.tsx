import { useState } from "react";
import { Card } from "@/components/ui/card";
import { GitCommit, GitPullRequest, MessageSquare, GitBranch } from "lucide-react";

interface ContributionSectionProps {
  username: string;
  year: number;
}

const ContributionSection = ({ username, year }: ContributionSectionProps) => {

  const activityData = [
    {
      month: "December 2024",
      summary: "127 contributions in private repositories",
      range: "Dec 2 – Dec 30",
      events: [
        {
          icon: <GitCommit className="h-4 w-4" />,
          title: "Created 23 commits",
          repos: ["UptimeAI/uptime_webapp", "UptimeAI/uptime_engine"],
          date: "Dec 15, 2024",
        },
        {
          icon: <GitPullRequest className="h-4 w-4" />,
          title: "Opened 4 pull requests",
          repos: ["UptimeAI/uptime_ml", "UptimeAI/uptime_scripts"],
          date: "Dec 10, 2024",
        },
      ],
    },
    {
      month: "November 2024",
      summary: "132 contributions in private repositories",
      range: "Nov 1 – Nov 29",
      events: [
        {
          icon: <GitBranch className="h-4 w-4" />,
          title: "Created a branch",
          repos: ["UptimeAI/uptime_webapp"],
          date: "Nov 25, 2024",
        },
        {
          icon: <MessageSquare className="h-4 w-4" />,
          title: "Commented on issues",
          repos: ["UptimeAI/uptime_ml"],
          date: "Nov 12, 2024",
        },
      ],
    },
  ];

  const [visibleMonths, setVisibleMonths] = useState(1);

  return (
    <Card className="overflow-hidden">
      <div className="p-6">

        <h2 className="text-base font-semibold text-foreground mb-6">
          Contribution activity
        </h2>

        <div className="space-y-12">
          {activityData.slice(0, visibleMonths).map((block, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold text-muted-foreground">
                {block.month}
              </h3>

              <p className="text-sm text-muted-foreground mb-4">
                {block.summary} ({block.range})
              </p>

              <div className="space-y-6">
                {block.events.map((event, j) => (
                  <div key={j} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      {event.icon}
                    </div>

                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">
                        {event.title}
                      </div>

                      <div className="mt-2 space-y-1">
                        {event.repos.map((repo, k) => (
                          <a
                            key={k}
                            href={`https://github.com/${repo}`}
                            className="text-sm text-blue-600 hover:underline block"
                          >
                            {repo}
                          </a>
                        ))}
                      </div>

                      <div className="text-xs text-muted-foreground mt-1">
                        {event.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Show more button */}
        {visibleMonths < activityData.length && (
          <div className="mt-6">
            <button
              onClick={() => setVisibleMonths(visibleMonths + 1)}
              className="text-sm text-blue-600 hover:underline"
            >
              Show more activity
            </button>
          </div>
        )}

      </div>
    </Card>
  );
};

export default ContributionSection;

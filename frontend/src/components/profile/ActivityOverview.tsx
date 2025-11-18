import { Card } from "@/components/ui/card";

interface ActivityOverviewProps {
  username: string;
}

const data = {
  commits: 89,
  prs: 10,
  reviews: 1,
  issues: 0,
};

const ActivityOverview = ({ username }: ActivityOverviewProps) => {
  const center = { x: 150, y: 140 };
  const maxLength = 90;

  const toPoint = (angleDeg: number, value: number) => {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    const length = (value / 100) * maxLength;

    return {
      x: center.x + Math.cos(rad) * length,
      y: center.y + Math.sin(rad) * length,
    };
  };

  const commitsPt = toPoint(180, data.commits);
  const prsPt = toPoint(180 + 90, data.prs);
  const reviewsPt = toPoint(90, data.reviews);
  const issuesPt = toPoint(0, data.issues);

  const polygonPoints = `
    ${reviewsPt.x},${reviewsPt.y}
    ${issuesPt.x},${issuesPt.y}
    ${prsPt.x},${prsPt.y}
    ${commitsPt.x},${commitsPt.y}
  `;

  return (
    <div className="p-4">

      <h3 className="text-md text-foreground mb-4">Activity overview</h3>

      {/* ROW */}
      <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-6">

        {/* LEFT SIDE */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="https://avatars.githubusercontent.com/u/45120?v=4"
              alt="timescale"
              className="h-8 w-8 rounded-md border"
            />
            <span className="text-sm font-medium">@timescale</span>
          </div>

          <p className="text-sm text-muted-foreground">
            Contributed to{" "}
            <a
              className="text-blue-600 hover:underline"
              href="https://github.com/timescale/pgvectorscale"
            >
              timescale/pgvectorscale
            </a>
          </p>
        </div>

        <div className="hidden md:block self-stretch w-px bg-[#d0d7de] mx-4" />


        {/* RIGHT — SPIDER CHART */}
        <div className="relative w-full md:w-[320px] h-[280px]">
          <svg className="w-full h-full" viewBox="0 0 300 280">

            {/* AXIS LINES */}
            <line
              x1={center.x}
              y1={center.y - maxLength}
              x2={center.x}
              y2={center.y + maxLength}
              stroke="#1a7f37"
              strokeWidth="2"
            />
            <line
              x1={center.x - maxLength}
              y1={center.y}
              x2={center.x + maxLength}
              y2={center.y}
              stroke="#1a7f37"
              strokeWidth="2"
            />

            {/* POLYGON */}
            <polygon
              points={polygonPoints}
              fill="rgba(0,128,0,0.2)"
              stroke="#116329"
              strokeWidth="2"
            />

            {/* DOTS */}
            {[reviewsPt, issuesPt, prsPt, commitsPt].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill="#116329" />
            ))}

            {/* LABELS */}
            <text
              x={center.x}
              y={center.y - maxLength - 10}
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
            >
              {data.reviews}%
              <tspan x={center.x} dy="14">Code review</tspan>
            </text>

            <text
              x={center.x + maxLength + 10}
              y={center.y + 4}
              className="text-xs fill-muted-foreground"
            >
              Issues
            </text>

            <text
              x={center.x}
              y={center.y + maxLength + 20}
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
            >
              {data.prs}%
              <tspan x={center.x} dy="14">Pull requests</tspan>
            </text>

            <text
              x={center.x - maxLength - 10}
              y={center.y + 4}
              textAnchor="end"
              className="text-xs fill-muted-foreground"
            >
              {data.commits}%
              <tspan x={center.x - maxLength - 10} dy="14">Commits</tspan>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ActivityOverview;
